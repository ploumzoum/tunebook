import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AddTuneModal from '../components/addTuneModal';
import getTunes from '../api/getTunes';
import deleteTune from '../api/deleteTune';
import X from '../svgs/x';

export default function Home() {
  const history = useHistory();
  const [searchTerms, setSearchTerms] = useState('');
  const [tunes, setTunes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const refreshTunes = async () => {
    const tunes = await getTunes({ searchTerms });
    setTunes(tunes);
  };
  const handleSelection = (tuneId) => {
    history.push(`/tunes/${tuneId}`);
  };
  const handleDelete = async (e, tuneId) => {
    e.stopPropagation();
    const result = await deleteTune({ tuneId });
    if (result === 204) {
      refreshTunes();
    }
  };
  useEffect(() => refreshTunes(), [searchTerms, showModal]);

  return (
    <main id="home">
      <input
        type="text"
        className="search-bar"
        placeholder="Rechercher"
        onChange={(e) => setSearchTerms(e.target.value)}
      />
      <div className="title-bar">
        <div className="heading-2">Tunebook</div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          Ajouter
        </button>
        {showModal && <AddTuneModal setShowModal={setShowModal} />}
      </div>
      <div className="tune-list">
        {tunes.map((tune) => (
          <div
            className="tune-row"
            onClick={(e) => handleSelection(tune._id)}
            key={tune._id}
          >
            <div className="title">
              <div className="medium-700">
                {tune.title}{' '}
                <span className="small-400">{`par ${tune.composer}`}</span>
              </div>
              <div className="small-400-secondary">{`${tune.type} en ${tune.key}`}</div>
            </div>
            <div className="abc">{tune.abc}</div>
            <div
              className="btn-icon"
              onClick={(e) => handleDelete(e, tune._id)}
            >
              <X />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
