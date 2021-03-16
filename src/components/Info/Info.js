import './Info.css';

const Info = (props) => {
  return (
    <section className={`info info_type_${props.type}`}>
      <div className={`info__container info__container_type_${props.type}`}>
        <h2 className="info__title">
          {// eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a id={props.linkId} name={props.linkId} className="info__anchor">{props.content}</a>}
        {props.title}
      </h2>
      {props.children}
      </div>
    </section>
  );
};

export default Info;