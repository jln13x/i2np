import { PageSuccess } from './PageSuccess';

interface AddToPageSuccessProps {
  url: string;
}

export const AddToPageSuccess: React.FC<AddToPageSuccessProps> = ({ url }) => {
  return <PageSuccess pageUrl={url} text="Successfully added to page." />;
};
