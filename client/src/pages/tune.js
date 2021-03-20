import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import LeftArrow from '../svgs/arrow-left.js';
import getTune from '../api/getTune';
import patchTune from '../api/patchTune';
import useForm from '../utils/useForm';
import FormInput from '../components/form/formInput.js';

export default function Tune(props) {
  const history = useHistory();
  const { tuneId } = useParams();
  const [tune, setTune] = useState({});
  const form = useForm(
    {
      title: {
        value: '',
        errors: [],
        validators: ['required'],
      },
      type: {
        value: '',
        errors: [],
        validators: ['required'],
      },
      key: {
        value: '',
        errors: [],
        validators: ['required'],
      },
      composer: {
        value: '',
        errors: [],
        validators: ['required'],
      },
      abc: {
        value: '',
        errors: [],
        validators: ['required'],
      },
      note: {
        value: '',
        errors: [],
      },
    },
    true,
  );

  const [triedSubmit, setTriedSubmit] = useState(false);
  const updateTune = async () => {
    if (form.isValid()) {
      await patchTune({ tuneId, ...form.toJS() });
      form.cleanFields();
    }
    setTriedSubmit(true);
  };
  const refreshTune = async () => {
    const tune = await getTune({ tuneId });
    setTune(tune);
  };
  const handleOnClick = () => history.push('/');
  useEffect(() => refreshTune(), []);
  useEffect(() => {
    form.loadFields(tune);
  }, [tune]);
  return (
    <main id="tune">
      <div className="topBar">
        <div className="backBtn" onClick={handleOnClick}>
          <LeftArrow />
        </div>
      </div>
      <form>
        <FormInput errors={form.fields.title.errors} triedSubmit={triedSubmit}>
          <label htmlFor="title">Titre</label>
          <input
            id="title"
            value={form.fields.title.value}
            onChange={form.handlers.title}
            onBlur={updateTune}
          />
        </FormInput>
        <FormInput errors={form.fields.type.errors} triedSubmit={triedSubmit}>
          <label htmlFor="type">Type</label>
          <input
            id="type"
            value={form.fields.type.value}
            onChange={form.handlers.type}
            onBlur={updateTune}
          />
        </FormInput>
        <FormInput errors={form.fields.abc.errors} triedSubmit={triedSubmit}>
          <label htmlFor="abc">abc</label>
          <input
            id="abc"
            value={form.fields.abc.value}
            onChange={form.handlers.abc}
            onBlur={updateTune}
          />
        </FormInput>
        <FormInput errors={form.fields.key.errors} triedSubmit={triedSubmit}>
          <label htmlFor="key">Tonalité(s)</label>
          <input
            id="key"
            value={form.fields.key.value}
            onChange={form.handlers.key}
            onBlur={updateTune}
          />
        </FormInput>
        <FormInput
          errors={form.fields.composer.errors}
          triedSubmit={triedSubmit}
        >
          <label htmlFor="composer">Compositeur(rice)</label>
          <input
            id="composer"
            value={form.fields.composer.value}
            onChange={form.handlers.composer}
            onBlur={updateTune}
          />
        </FormInput>
        <FormInput errors={form.fields.note.errors} triedSubmit={triedSubmit}>
          <label htmlFor="note">Note</label>
          <textarea
            id="note"
            value={form.fields.note.value}
            onChange={form.handlers.note}
            onBlur={updateTune}
          />
        </FormInput>
      </form>
    </main>
  );
}
