type NewProps = {
  name: string;
  optional?: string;
};

const New = ({ name, optional }: NewProps) => {
  return (
    <>
      <div className='hi'>
        <ul>
          <li>📖 TypeScripttttttt</li>
          <li>{name}</li>
          {optional && <li>{optional}</li>}
        </ul>
        <div>
          <a>Github</a>
        </div>
      </div>
      <style jsx>{`
        .hi {
          background: #ddd;
          height: 200vh;
        }
      `}</style>
    </>
  );
};

export default New;
