import { Card } from 'react-bootstrap';
import './style.scss';
import hordeIcon from '../../assets/horde-icon.png';
import alianceIcon from '../../assets/aliance-icon.png';
import { useCharsStore } from '../../store/store';
import { useCallback, useEffect, useState } from 'react';

import { IChar } from '../../utils/interfaces';
import { AddCardBtn } from '../AddCardBtn';
import { addNewCharacter, deleteCharacter, updateCharacter } from '../../store/apiCalls';
import dropDownIcon from '../../assets/drop-down-icon-pink.png';
import { DropDownCharMenu } from '../DropDownCharMenu';
import CharFormModal from './CharFormModal';
import { ConfirmModal } from '../ConfirmModal';
import { InfoToast } from '../InfoToast';

function CharsContainer({ stat }: { stat: boolean }) {
  const charsStore = useCharsStore();
  const chars = useCharsStore((state) => state.chars);

  const selChars = stat
    ? useCharsStore((state) => state.selectedChars)
    : useCharsStore((state) => state.selectedSingleChar);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [contextMenuChar, setContextMenuChar] = useState<IChar | null>(null);

  const [openSuccessToast, setOpenSuccessToast] = useState<string | null>(null);
  const [openErrorToast, setOpenErrorToast] = useState<string | null>(null);

  const addChar = async (
    charName: string,
    server: string,
    fraction: string,
    portrait: string | null,
  ) => {
    const success = await addNewCharacter(charName, server, fraction, portrait);
    if (success) {
      setOpenSuccessToast('add');
      charsStore.getChars();
    } else {
      setOpenErrorToast('add');
    }
    setShowAddModal(false);
  };

  const updateChar = async (
    charName: string,
    server: string,
    fraction: string,
    portrait: string | null,
    id: string | undefined,
  ) => {
    if (id) {
      const success = await updateCharacter(id, charName, server, fraction, portrait);
      if (success) {
        setOpenSuccessToast('update');
        charsStore.getChars();
      } else {
        setOpenErrorToast('update');
      }
    }
  };

  const handleCharSelect = (char: IChar) => {
    if (stat) charsStore.selectChar(char);
    else charsStore.setSelectedSingleChar(char);
  };
  const handleContextMenu = (eventKey: string) => {
    if (eventKey === 'update') {
      setShowUpdateModal(true);
    } else if (eventKey === 'delete') {
      setShowConfirmModal(true);
    }
    setContextMenuChar(null);
  };

  const deleteChar = async (char: IChar | undefined | null) => {
    if (char) {
      const success = await deleteCharacter(char.id);
      if (success) {
        setOpenSuccessToast('delete');
        charsStore.deleteOneFromSelected(char);
        if (charsStore.selectedSingleChar?.id === char.id) {
          charsStore.setSelectedSingleChar(null);
        }
        charsStore.getChars();
      } else {
        setOpenErrorToast('add');
      }
      setShowConfirmModal(false);
    }
  };

  const bgColor = useCallback(
    (ch: IChar) => {
      if (stat) {
        if ((selChars as IChar[]).map((s) => s.id).includes(ch.id)) {
          if (ch.fraction === 'horde') return '#ff000042';
          if (ch.fraction === 'aliance') return '#0066ff54';
        } else return 'transparent';
      } else {
        const sel = selChars as IChar;
        if (!sel || ch.id !== sel.id) return 'transparent';
        if (sel.fraction === 'horde') return '#ff000042';
        if (sel.fraction === 'aliance') return '#0066ff54';
      }
    },
    [selChars],
  );

  useEffect(() => {
    charsStore.getChars();
  }, []);

  return (
    <>
      <div className='char-container'>
        <ConfirmModal
          show={showConfirmModal}
          char={contextMenuChar}
          handleConfirmFrame={deleteChar}
          handleClose={() => setShowConfirmModal(false)}
        />

        {chars.map((ch) => (
          <div className='card-container' onMouseLeave={() => setContextMenuChar(null)} key={ch.id}>
            <Card
              className='char-card'
              style={{
                borderColor: `${ch.fraction === 'horde' ? 'red' : 'lightBlue'}`,
                background: `${bgColor(ch)}`,
              }}
              onClick={(e) => {
                if (!(e.target as HTMLElement).classList.contains('drop-indicator')) {
                  handleCharSelect(ch);
                }
              }}>
              <Card.Img
                variant='top'
                src={ch.fraction === 'horde' ? hordeIcon : alianceIcon}
                style={{ width: '50px', height: '50px' }}
              />
              <Card.Text style={{ fontSize: '0.8rem' }}>{ch.name}</Card.Text>
            </Card>
            <div
              className='bg-secondary1 position-absolute char-drop-indicator'
              onClick={() => {
                setContextMenuChar(ch);
              }}>
              <img style={{ width: '50%', paddingBottom: '8px' }} src={dropDownIcon}></img>
            </div>
            {contextMenuChar && (
              <DropDownCharMenu
                show={contextMenuChar && contextMenuChar.id === ch.id ? true : false}
                handleContextMenu={handleContextMenu}
              />
            )}
          </div>
        ))}
        <AddCardBtn handleClick={() => setShowAddModal(true)} size='40px' text='+' />
        <CharFormModal
          show={showAddModal}
          action={'add'}
          handleForm={addChar}
          closeForm={() => {
            setShowAddModal(false);
          }}
        />
        <CharFormModal
          show={showUpdateModal}
          action={'update'}
          char={contextMenuChar}
          handleForm={updateChar}
          closeForm={() => {
            setShowUpdateModal(false);
          }}
        />
      </div>
      <InfoToast
        show={!!openSuccessToast}
        text={
          openSuccessToast === 'add'
            ? `Your character was succesfully created!`
            : openSuccessToast === 'update'
            ? `Your character was succesfully updated!`
            : `Your character was succesfully deleted!`
        }
        success={true}
        handleCloseToast={() => setOpenSuccessToast(null)}
      />
      <InfoToast
        show={!!openErrorToast}
        text={
          openErrorToast === 'add'
            ? `Your character was not created`
            : openErrorToast === 'update'
            ? `Your character was not updated`
            : `Your character was not deleted`
        }
        success={false}
        handleCloseToast={() => setOpenErrorToast(null)}
      />
    </>
  );
}

export default CharsContainer;
