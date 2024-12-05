interface KeyValueCardProps {
  title: string;
  subTitle?: React.ReactNode;
  options?: React.ReactNode;
  children?: React.ReactNode;
}

export const KeyValueCard = ({
  title,
  options,
  children,
}: KeyValueCardProps) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-md-5 mb-2 mb-md-0 d-flex flex-column">
            <h4 className="mb-0">{title}</h4>
          </div>

          <div className="col-md-7 d-grid d-sm-flex justify-content-md-end align-items-sm-center gap-4">
            {options && <div>{options}</div>}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};
