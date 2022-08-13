import { useParams } from 'react-router';

const NoticeViewPage = () => {
  const params = useParams();
  return (
    <>
      <h1>안녕하세요</h1>
      <h1>안녕하세요</h1>
      <h1>{params.id}</h1>
    </>
  );
};

export default NoticeViewPage;
