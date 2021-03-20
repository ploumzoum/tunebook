import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import getTunes from '../api/getTunes';
import deleteTune from '../api/deleteTune';
import X from '../svgs/x';

export default function Home() {
  const history = useHistory();
  const [searchTerms, setSearchTerms] = useState('');
  const [tunes, setTunes] = useState([]);
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
  useEffect(() => refreshTunes(), [searchTerms]);

  return (
    <main id="home">
      <div className="navigation">
        <div>Mes tunes</div>
        <div>Ajouter une tune</div>
      </div>
      <div className="content">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher"
            onChange={(e) => setSearchTerms(e.target.value)}
          />
        </div>
        {tunes.map((tune) => (
          <div className="tune-row" onClick={(e) => handleSelection(tune._id)}>
            <div>
              <div>{tune.title}</div>
              <div>{`${tune.type} en ${tune.key}`}</div>
            </div>
            <div>{tune.abc}</div>
            <div>{tune.composer}</div>
            <div onClick={(e) => handleDelete(e, tune._id)}>
              <X />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
