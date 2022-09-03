import { CommentData, ProcessedTypePostData } from '~/others/integrateInterface';

interface TableRowForMobileProps {
  row: ProcessedTypePostData;
}

interface TableRowForCommentProps {
  commentData: CommentData;
}

export { TableRowForMobileProps, TableRowForCommentProps };
