type NewProps = {
  name: string;
  optional?: string;
};

const New = ({ name, optional }: NewProps) => {
  return (
    <>
      <div>
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
        div {
          background: #ddd;
        }
      `}</style>
    </>
  );
};

export default New;
