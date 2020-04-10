/*Function that takes a number representing the price of an item, a number representing the dollars and cents paid, 
and an array that contains each currency and how much of each is in the cash register. The function takes these 
values and returns the status of the transaction ('insufficient funds' if there isn't enough cash in the drawer, 'closed'
if the transaction empties the register, or 'open' if there is still remaining cash). It also returns an array of containing
each value of currency due and the number of each (e.g. ["Penny", 5]).*/

function checkCashRegister(price, cash, cid) {
  let obj = {
    status: '',
    change: []
  };
  let changeDue = cash - price;
  let totalInDrawer = 0;

  //Name, value, and number of currency
  let register = [
    ["PENNY", .01, 0],
    ["NICKEL", .05, 0],
    ["DIME", .1, 0],
    ["QUARTER", .25, 0],
    ["ONE", 1, 0],
    ["FIVE", 5, 0],
    ["TEN", 10, 0],
    ["TWENTY", 20, 0],
    ["ONE HUNDRED", 100, 0]
  ];

  //Fills register with # of each currency based on cid
  function fillRegister() {
    for (let i = 0; i < cid.length; i++) {
      for (let j = 0; j < register.length; j++) {
        if (cid[i][0] === register[j][0]) {
        register[j][2] = cid[i][1];
        }
      }
    }
  };

  //Calculate total cash in drawer based on cid
  function totalCash() {
    for (let i = 0; i < cid.length; i++) {
      totalInDrawer += cid[i][1];
    }
  };

  //If cash in drawer is less than change due, set change to insufficient funds
  function enoughFunds() {
    if (totalInDrawer < changeDue) {
      obj.status = 'INSUFFICIENT_FUNDS';
    }
  };

  //Set change and status values
  function setChange() {
    enoughFunds();
    //If not enough funds, exit function
    if (obj.status === 'INSUFFICIENT_FUNDS') {
      return obj.status;
    //Otherwise, start counting change
    } else {
        //Iterate through each currency value
        for (let i = register.length-1; i > -1; i--) {
          //If that currency is not too large and there is > 0 of it, continue
          if (((changeDue/register[i][1]) >= 1) && (register[i][2] > 0)) {
            //Set the number of that currency
            let numCurrency = register[i][2]/register[i][1];
            //If using all the currency is too much, decrease it
            for (let k = numCurrency; k > -1; k--) {
              //Have to add the .001 because of JavaScript inaccurate numbers
              if (numCurrency*register[i][1]/changeDue > 1.001) {
                numCurrency--;
                }
              }
            //Push the name of the currency and the number needed
            obj.change.push([register[i][0], numCurrency*register[i][1]]);
            //Decrement changeDue as you've given out currency
            changeDue -= (register[i][1]*numCurrency);
            //Decrement the amount left in the register
            register[i][2] -= (register[i][1]*numCurrency);
          }
        }
        //If change isn't exact, set change to [] and status to INSUFFICIENT_FUNDS
        if (Math.ceil(changeDue) != 0) {
          obj.status = 'INSUFFICIENT_FUNDS';
          obj.change = [];
          return obj.status;
        //Otherwise, check to see if the register has leftover change or not
        } else {
          let remainingChange = 0;
          for (let j = 0; j < register.length; j++) {
            remainingChange += register[j][2];
          };
        //If there's no remaining change, set status to closed, otherwise set to open
        if (remainingChange === 0) {
          obj.status = 'CLOSED';
          obj.change = cid;
        } else {
          obj.status = 'OPEN';
          }
        }
    }
  };
  
  fillRegister();
  
  totalCash();

  setChange();
  
  return obj;
};