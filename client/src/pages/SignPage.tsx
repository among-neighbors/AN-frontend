import SignIn from '~/components/organisms/SignInForm';

const SignPage = () => {
  return (
    <>
      <div className='signPage'>
        <SignIn />
      </div>
      <style jsx='true'>{`
        .signPage {
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  );
};

export default SignPage;
