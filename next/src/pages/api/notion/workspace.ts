import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/prisma";
import { hash } from "../../../server/hash";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers["X-Notion-Access-Token".toLowerCase()];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const account = await prisma.account.findFirst({
    where: {
      accessToken: hash(Array.isArray(token) ? token[0] : token),
    },
  });

  return res.json({
    workspaceName: account?.workspaceName,
  });
};

export default handler;
