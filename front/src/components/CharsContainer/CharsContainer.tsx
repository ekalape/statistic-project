import { Card } from 'react-bootstrap';
import './style.scss';
import hordeIcon from '../../assets/horde-icon.png';
import alianceIcon from '../../assets/aliance-icon.png';
import { useCharsStore } from '../../store/store';
import { useCallback, useEffect, useState } from 'react';

import { IChar } from '../../utils/interfaces';
import { AddCardBtn } from '../AddCardBtn';
import { addNewCharacter, updateCharacter } from '../../store/apiCalls';
import dropDownIcon from '../../assets/drop-down-icon-pink.png';
import { DropDownCharMenu } from '../DropDownCharMenu';
import CharFormModal from './CharFormModal';

function CharsContainer({ stat }: { stat: boolean }) {
  const charsStore = useCharsStore();
  const chars = useCharsStore((state) => state.chars);

  const selChars = stat
    ? useCharsStore((state) => state.selectedChars)
    : useCharsStore((state) => state.selectedSingleChar);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [contextMenuChar, setContextMenuChar] = useState<IChar | null>(null);

  const addChar = async (
    charName: string,
    server: string,
    fraction: string,
    portrait: string | null,
  ) => {
    const success = await addNewCharacter(charName, server, fraction, portrait);
    if (success) {
      charsStore.getChars();
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
        console.log('success', success);
        charsStore.getChars();
      }
    }
  };

  const handleCharSelect = (char: IChar) => {
    if (stat) charsStore.selectChar(char);
    else charsStore.setSelectedSingleChar(char);
  };
  const handleContextMenu = (char: IChar, eventKey: string) => {
    if (eventKey === 'update') {
      setShowUpdateModal(true);
    }
    setContextMenuChar(null);
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
    <div className='char-container'>
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
              char={ch}
              handleContectMenu={handleContextMenu}
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
  );
}

export default CharsContainer;
