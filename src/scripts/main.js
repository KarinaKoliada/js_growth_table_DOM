'use strict';

const refs = {
  buttons: {
    appendRow: document.querySelector('.append-row'),
    removeRow: document.querySelector('.remove-row'),
    appendCln: document.querySelector('.append-column'),
    removeCln: document.querySelector('.remove-column'),
  },
  table: document.querySelector('.field'),
  row: document.querySelector('.field tr'),
};

const MAX_ROWS = 10;
const MIN_ROWS = 2;
const MAX_COLUMNS = 10;
const MIN_COLUMNS = 2;

function addElement(type) {
  if (type === 'row' && refs.table.rows.length < MAX_ROWS) {
    const newRow = refs.table.insertRow();
    const columnCount = refs.table.rows[0].cells.length;

    for (let i = 0; i < columnCount; i++) {
      const cell = newRow.insertCell();

      cell.textContent = '';
    }

    updateButtons();
  } else if (
    type === 'column' &&
    refs.table.rows[0].cells.length < MAX_COLUMNS
  ) {
    Array.from(refs.table.rows).forEach((row) => {
      const cell = row.insertCell();

      cell.textContent = '';
    });

    updateButtons();
  }
}

function removeElement(type) {
  if (type === 'row' && refs.table.rows.length > MIN_ROWS) {
    refs.table.deleteRow(-1);

    updateButtons();
  } else if (
    type === 'column' &&
    refs.table.rows[0].cells.length > MIN_COLUMNS
  ) {
    Array.from(refs.table.rows).forEach((row) => {
      row.deleteCell(-1);
    });

    updateButtons();
  }
}

function updateButtons() {
  refs.buttons.appendRow.disabled = refs.table.rows.length === MAX_ROWS;
  refs.buttons.removeRow.disabled = refs.table.rows.length === MIN_ROWS;

  refs.buttons.appendCln.disabled =
    refs.table.rows[0].cells.length === MAX_COLUMNS;

  refs.buttons.removeCln.disabled =
    refs.table.rows[0].cells.length === MIN_COLUMNS;
}

refs.buttons.appendRow.addEventListener('click', () => addElement('row'));
refs.buttons.removeRow.addEventListener('click', () => removeElement('row'));
refs.buttons.appendCln.addEventListener('click', () => addElement('column'));
refs.buttons.removeCln.addEventListener('click', () => removeElement('column'));
