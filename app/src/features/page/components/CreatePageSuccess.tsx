import { PageSuccess } from './PageSuccess';

interface CreateSubpageSuccessProps {
  pageUrl: string;
}

export const CreatePageSuccess: React.FC<CreateSubpageSuccessProps> = ({
  pageUrl,
}) => {
  return <PageSuccess pageUrl={pageUrl} text="Successfully created page" />;
};
