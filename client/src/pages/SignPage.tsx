import SignIn from '~/components/organisms/SignInForm';

const SignPage = () => {
  return (
    <>
      <div className='signPage'>
        <SignIn />
      </div>
      <style jsx>{`
        .signPage {
          display: flex;
          align-items: center;
          height: calc(100vh - 70px);
        }
      `}</style>
    </>
  );
};

export default SignPage;
