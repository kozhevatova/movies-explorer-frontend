import './Info.css';

const Info = (props) => {
  return (
    <div className={`info info_type_${props.type}`}>
      <div className={`info__container info__container_type_${props.type}`}>
        <h2 className="info__title">
          <a id={props.linkId} name={props.linkId}></a>
        {props.title}
      </h2>
      {props.children}
      </div>
    </div>
  );
};

export default Info;