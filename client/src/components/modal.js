import X from './../svgs/x';

export default function Modal({ title = '', actions, setShowModal, children }) {
  return (
    <div
      className="modal-background"
      onClick={(e) => {
        setShowModal(false);
      }}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="top-bar">
          <div className="heading-4">{title}</div>
          <button className="btn-icon" onClick={() => setShowModal(false)}>
            <X />
          </button>
        </div>
        <div className="content">{children}</div>
        <div className="downBar">
          {actions && actions()}
          {!actions && (
            <button
              className="btn-secondary"
              onClick={() => setShowModal(false)}
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
