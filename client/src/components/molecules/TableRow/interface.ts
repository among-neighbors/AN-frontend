import { Comment, ProcessedTypePostData } from '~/others/integrateInterface';

interface TableRowForMobileProps {
  row: ProcessedTypePostData;
}

interface TableRowForCommentProps {
  commentData: Comment;
}

export { TableRowForMobileProps, TableRowForCommentProps };
