import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "../../server/db/prisma";
import { hash } from "../../server/hash";

export const accessTokenResponseSchema = z.object({
  access_token: z.string(),
  workspace_id: z.string(),
  workspace_name: z.string().nullable(),
  workspace_icon: z.string().nullable(),
  bot_id: z.string(),
  owner: z.object({
    user: z.object({
      id: z.string(),
      name: z.string(),
      avatar_url: z.string().nullable(),
      person: z.object({
        email: z.string(),
      }),
    }),
  }),
});

type AccessTokenResponse = z.infer<typeof accessTokenResponseSchema>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const code = req.body.code;

  console.log({
    code,
  });

  if (!code) {
    return res.status(400).json({ error: "Missing code" });
  }

  const response = await exchangeGrant(code);

  await handleTokenResponse(response);

  return res.status(200).json({
    accessToken: response.access_token,
  });
};

const exchangeGrant = async (code: string) => {
  const auth = getBasicAuthForIntegration();

  const notionTokenEndpoint = process.env.NOTION_TOKEN_ENDPOINT as string;
  const redirectUri = process.env.NOTION_REDIRECT_URI as string;

  const response = await fetch(notionTokenEndpoint, {
    method: "POST",
    body: JSON.stringify({
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    }),
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  console.log({
    data
  })

  return accessTokenResponseSchema.parse(data);
};

const getBasicAuthForIntegration = () => {
  return Buffer.from(
    `${process.env.NOTION_CLIENT_ID}:${process.env.NOTION_CLIENT_SECRET}`
  ).toString("base64");
};

const handleTokenResponse = async (response: AccessTokenResponse) => {
  const user = await prisma.user.findFirst({
    where: {
      notionUserId: response.owner.user.id,
    },
    include: {
      accounts: {
        where: {
          workspaceId: response.workspace_id,
        },
      },
    },
  });

  // No user exists yet, create one
  if (!user) {
    return await createUser(response);
  }

  // User exists, but no workspace exists yet
  if (user.accounts.length === 0) {
    return await addWorkspaceToUser(user.id, response);
  }

  // User and workspace exists, update the workspace
  return await updateUser(user.accounts[0].id, response);
};

const createUser = async (response: AccessTokenResponse) => {
  return await prisma.account.create({
    data: {
      accessToken: hash(response.access_token),
      workspaceId: response.workspace_id,
      workspaceName: response.workspace_name,
      workspaceIconUrl: response.workspace_icon,
      botId: response.bot_id,
      email: response.owner.user.person.email,
      User: {
        create: {
          notionUserId: response.owner.user.id,
        },
      },
    },
  });
};

const addWorkspaceToUser = async (
  userId: string,
  response: AccessTokenResponse
) => {
  return await prisma.account.create({
    data: {
      accessToken: hash(response.access_token),
      workspaceId: response.workspace_id,
      workspaceName: response.workspace_name,
      workspaceIconUrl: response.workspace_icon,
      botId: response.bot_id,
      email: response.owner.user.person.email,
      User: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

const updateUser = async (accountId: string, response: AccessTokenResponse) => {
  return await prisma.account.update({
    data: {
      accessToken: hash(response.access_token),
      workspaceId: response.workspace_id,
      workspaceName: response.workspace_name,
      workspaceIconUrl: response.workspace_icon,
      botId: response.bot_id,
      email: response.owner.user.person.email,
    },
    where: {
      id: accountId,
    },
  });
};

export default handler;
