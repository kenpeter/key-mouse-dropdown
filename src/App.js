import React, {useState, useEffect} from 'react';

function Menu({buttonName, menuIndex, currRowInd, setCurrRowInd}) {
  // inside menu
  const [open, setOpen] = useState(false);
  const menuItems = {download: 'download', view: 'view', delete: 'delete'};
  const [isMenuActioned, setIsMenuActioned] = useState(false);

  /*
  useEffect(() => {
    // * something is clicked for that button
    if (isMenuActioned) {
      // this menu is focus
      if (currRowInd === menuIndex) {
        setOpen(!open);
      } else {
        //test
        console.log('never call!!!!!!!!!');
        setOpen(false);
      }
    }

    return () => {
      // no longer click
      setIsMenuActioned(false);
    };
  }, [isMenuActioned, currRowInd, menuIndex, open]);
  */

  // -- 2 --
  useEffect(() => {
    if (currRowInd === menuIndex) {
      setOpen(!open);
    } else {
      setOpen(false);
    }

    return () => {
      // test
      console.log('clean up set open false');
      setOpen(false);
    };
  }, [currRowInd]);

  // -- 1 --
  useEffect(() => {
    if (isMenuActioned) {
      // that menu got focus
      setCurrRowInd('');
      setCurrRowInd(menuIndex);
    }

    return () => {
      setIsMenuActioned(false);
    };
  }, [isMenuActioned]);

  const itemOnClick = (event, itemIndex) => {
    // it is mouse click
    if (event.pageX !== 0 && event.pageY !== 0) {
      console.log('item click fire redux event', itemIndex);
    }
  };

  return (
    <div>
      <button
        onClick={event => {
          // it is mouse click
          if (event.pageX !== 0 && event.pageY !== 0) {
            //test
            console.log('parent buttonicon onclick: ');

            // something clicked
            setIsMenuActioned(true);
          }
        }}
      >
        {buttonName}
      </button>

      {/*{open && menuIndex === currRowInd && (*/}
      {open && (
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
                onClick={event => {
                  itemOnClick(event, itemIndex);
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
