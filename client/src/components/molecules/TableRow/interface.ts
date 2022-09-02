import { ComplaintData, NoticeData, CommunityData } from '~/others/integrateInterface';

interface TableRowForMobileProps {
  row: NoticeData | ComplaintData | CommunityData;
}

interface Comment {
  writer: string;
  comment: string;
  date: string;
}

interface TableRowForCommentProps {
  commentData: Comment;
}

export { TableRowForMobileProps, TableRowForCommentProps };
