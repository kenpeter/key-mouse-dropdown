import React, {useState, useEffect} from 'react';

function Menu({buttonName, menuIndex, currRowInd, setCurrRowInd}) {
  // inside menu
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuItems = {download: 'download', view: 'view', delete: 'delete'};

  useEffect(() => {
    if (open && menuIndex === currRowInd) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }, [open, currRowInd]);

  return (
    <div>
      <button
        onClick={event => {
          // it is mouse click
          if (event.pageX !== 0 && event.pageY !== 0) {
            // toggle
            setOpen(!open);
            setCurrRowInd(menuIndex);
          }
        }}
      >
        {buttonName}
      </button>
      {showMenu && (
        <ul style={{padding: '5px', margin: '10px', border: '1px solid #ccc'}}>
          {Object.keys(menuItems).map((item, itemIndex) => {
            return (
              <li
                tabIndex="0"
                key={itemIndex}
                style={{
                  listStyle: 'none',
                  padding: '5px',
                  backgroundColor: 'blue'
                }}
              >
                {item}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function TableElement() {
  const [currRowInd, setCurrRowInd] = useState('');

  const items = [
    {
      file: 'file1',
      button: 'button1'
    },
    {
      file: 'file2',
      button: 'button2'
    },
    {
      file: 'file3',
      button: 'button3'
    }
  ];
  return (
    <table style={{borderCollapse: 'collapse', border: '1px solid black'}}>
      <tbody>
        {items.map((item, index) => {
          return (
            <tr key={index}>
              <td style={{border: '1px solid black'}}>
                <a href="#">{item.file}</a>
              </td>
              <td style={{border: '1px solid black'}}>
                <Menu
                  buttonName={item.button}
                  menuIndex={index}
                  currRowInd={currRowInd}
                  setCurrRowInd={setCurrRowInd}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function App() {
  return (
    <>
      <TableElement />
    </>
  );
}

export default App;
