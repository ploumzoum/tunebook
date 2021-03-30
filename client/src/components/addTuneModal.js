import { useState } from 'react';
import Modal from './modal';
import FormInput from './form/formInput';
import useForm from '../utils/useForm';
import postTune from '../api/postTune';
export default function AddTuneModal({ setShowModal }) {
  const form = useForm({
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
  });

  const [triedSubmit, setTriedSubmit] = useState(false);
  const createTune = async () => {
    if (form.isValid()) {
      await postTune({ ...form.toJS() });
      setShowModal(false);
    }
    setTriedSubmit(true);
  };
  return (
    <Modal
      title="Ajouter une tune"
      setShowModal={setShowModal}
      actions={() => (
        <>
          <button className="btn-secondary" onClick={() => setShowModal(false)}>
            Annuler
          </button>
          <button onClick={createTune} className="btn-primary">
            Soumettre
          </button>
        </>
      )}
    >
      <form>
        <FormInput errors={form.fields.title.errors} triedSubmit={triedSubmit}>
          <label htmlFor="title">Titre</label>
          <input
            id="title"
            value={form.fields.title.value}
            onChange={form.handlers.title}
          />
        </FormInput>
        <FormInput errors={form.fields.type.errors} triedSubmit={triedSubmit}>
          <label htmlFor="type">Type</label>
          <input
            id="type"
            value={form.fields.type.value}
            onChange={form.handlers.type}
          />
        </FormInput>
        <FormInput errors={form.fields.abc.errors} triedSubmit={triedSubmit}>
          <label htmlFor="abc">abc</label>
          <input
            id="abc"
            value={form.fields.abc.value}
            onChange={form.handlers.abc}
          />
        </FormInput>
        <FormInput errors={form.fields.key.errors} triedSubmit={triedSubmit}>
          <label htmlFor="key">Tonalité(s)</label>
          <input
            id="key"
            value={form.fields.key.value}
            onChange={form.handlers.key}
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
          />
        </FormInput>
        <FormInput errors={form.fields.note.errors} triedSubmit={triedSubmit}>
          <label htmlFor="note">Note</label>
          <textarea
            id="note"
            value={form.fields.note.value}
            onChange={form.handlers.note}
          />
        </FormInput>
      </form>
    </Modal>
  );
}
