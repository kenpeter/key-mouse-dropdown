import React, {useState, useEffect, useRef, createRef, useContext} from 'react';

const AppContext = React.createContext({
  name: 'AppContext'
});

function createMenuItemRefs(items, rowInd) {
  // obj
  let menuItemRefs = {};
  // loop each
  for (let i = 0; i < Object.keys(items).length; i++) {
    // When assign createRef, no current
    menuItemRefs[rowInd + i] = createRef();
  }
  return menuItemRefs;
}

function Menu({buttonName, parentRowIndex}) {
  const [currRowInd, setCurrRowInd] = useState('');
  const [open, setOpen] = useState(false);
  // press down key, will get 1st item which at index 0
  const [menuItemActiveIndex, setMenuItemActiveIndex] = useState(-1);

  const menuItems = {download: 'download', view: 'view', delete: 'delete'};
  const menuItemRefs = useRef(createMenuItemRefs(menuItems, parentRowIndex));

  useEffect(() => {
    if (open && menuItemActiveIndex >= 0 && parentRowIndex !== '') {
      console.log('focus!!');
      menuItemRefs.current[parentRowIndex + menuItemActiveIndex].focus();
    }
  }, [menuItemActiveIndex, open, parentRowIndex]);

  const buttonIconOnClick = (event, parentRowIndex) => {
    // close it
    setOpen(!open);
    // which one to close
    setCurrRowInd(parentRowIndex);
  };

  // on the button level
  const buttonIconKeyDown = (event, parentRowIndex) => {
    if (event.keyCode === 13) {
      // Enter pressed
      console.log('enter is pressed');

      setOpen(!open);
      setCurrRowInd(parentRowIndex);
    } else if (event.keyCode === 9) {
      // we cannot tab away
    } else if (event.keyCode === 40) {
      //test
      console.log('down arrow');

      // 38 is up arrow

      // No scrolling
      event.preventDefault();

      // set to 1st item in 0 index
      setMenuItemActiveIndex(0);
    }
  };

  const myOnKeyDown = (event, itemIndex) => {
    //console.log('keycode', event.keyCode);

    if (event.keyCode === 13) {
      console.log('enter press fire redux event', itemIndex);
    } else if (event.keyCode === 40) {
      if (itemIndex < Object.keys(menuItems).length - 1) {
        console.log('down');
        setMenuItemActiveIndex(itemIndex + 1);
      }
    } else if (event.keyCode === 38) {
      if (itemIndex > 0) {
        console.log('up');
        setMenuItemActiveIndex(itemIndex - 1);
      }
    }
  };

  return (
    <div>
      <button
        onClick={event => {
          if (event.pageX !== 0 && event.pageY !== 0) {
            //test
            console.log('parent buttonicon onclick: ');
            buttonIconOnClick(event, parentRowIndex);
          }
        }}
        onKeyDown={event => {
          //test
          console.log('parent buttonicon onkeydown: ');
          buttonIconKeyDown(event, parentRowIndex);
        }}
      >
        {buttonName}
      </button>

      {open && parentRowIndex === currRowInd && (
        <ul style={{padding: '5px', margin: '10px', border: '1px solid #ccc'}}>
          {Object.keys(menuItems).map((item, itemIndex) => {
            if (itemIndex === menuItemActiveIndex)
              return (
                <li
                  tabIndex="0"
                  key={itemIndex}
                  style={{
                    listStyle: 'none',
                    padding: '5px',
                    backgroundColor: 'blue'
                  }}
                  // put a ref
                  ref={element =>
                    (menuItemRefs.current[parentRowIndex + itemIndex] = element)
                  }
                  // we want own index
                  onKeyDown={event => myOnKeyDown(event, itemIndex)}
                >
                  {item}
                </li>
              );
            else
              return (
                <li
                  tabIndex="0"
                  key={itemIndex}
                  style={{listStyle: 'none', padding: '5px'}}
                  ref={element =>
                    (menuItemRefs.current[parentRowIndex + itemIndex] = element)
                  }
                  // we want own index
                  onKeyDown={event => myOnKeyDown(event, itemIndex)}
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
                <Menu buttonName={item.button} parentRowIndex={index} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function App() {
  const appContextObj = {};

  return (
    <>
      <AppContext.Provider value={appContextObj}>
        <TableElement />
      </AppContext.Provider>
    </>
  );
}

export default App;
