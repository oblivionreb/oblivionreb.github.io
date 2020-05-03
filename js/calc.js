

// IOS style bug fix


window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

if(window.mobileCheck() == true){
  $("input[data-type='currency']").on({
     input: function() {
      formatCurrency($(this));
    },
    blur: function() { 
      formatCurrency($(this), "blur");
    }
});
}else{
  $("input[data-type='currency']").on({
    keyup: function() {
      formatCurrency($(this));
    },
    blur: function() { 
      formatCurrency($(this), "blur");
    }
});
}


function formatNumber(n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
function reformatNumber(n){
   return n.replace(/\.\d\d/g,"").replace(/\D/g, "");
}


function formatCurrency(input, blur) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.
  
  // get input value
  var input_val = input.val();
  
  // don't validate empty input
  if (input_val === "") { return; }
  
  // original length
  var original_len = input_val.length;

  // initial caret position 
  var caret_pos = input.prop("selectionStart");
    
  // check for decimal
  if (input_val.indexOf(".") >= 0) {

    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(".");

    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);

    // add commas to left side of number
    left_side = formatNumber(left_side);

    // validate right side
    right_side = formatNumber(right_side);
    
    // On blur make sure 2 numbers after decimal
    if (blur === "blur") {
      right_side += "00";
    }
    
    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);

    // join number by .
    input_val = "$" + left_side + "." + right_side;

  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val = "$" + input_val;
    
    // final formatting
    if (blur === "blur") {
      input_val += ".00";
    }
  }
  
  // send updated string to input
  input.val(input_val);

  // put caret back in the right position
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
}

//Chart Output
(function(window, document, undefined) {

  'use strict';

  var DonutChart = DonutChart || {

    /**
      * Initialize Chart
      */

    init: function(options) {

      this.settings(options);
      this.createChartStructre();
      this.setChartMeta();
      

    }, // init()

    /**
      * Update Chart
      */

    update: function(options) {

      this.settings(options);
      this.setChartMeta();
      

    }, // update()

    /**
      * Chart Settings
      */

    settings: function(options) {

      this.config = {
        container: options.container ? options.container : this.config.container,
        data: options.data ? options.data : this.config.data,
        label: options.label ? this.label : 'Total Tax',
        offset: options.offset ? options.offset : 0,
        
      };

    }, // settings()

    /**
      * Build chart
      */

    // createWedges()

    /**
      * Create chart structure
      */

    createChartStructre: function() {

      var outer = document.createElement('div');
      var inner = document.createElement('div');
      var label = document.createElement('span');
      var value = document.createElement('span');

      outer.className = 'outer-circle';
      inner.className = 'inner-circle';
      label.className = 'inner-circle-label';
      value.className = 'inner-circle-value';

      this.config.container.appendChild(outer);
      this.config.container.appendChild(inner);
      outer.appendChild(label);
      outer.appendChild(value);

    }, // createChartStructre()

    /**
      * Set chart meta
      */

    setChartMeta: function() {

      var label = this.config.container.querySelector('.inner-circle-label');
      var value = this.config.container.querySelector('.inner-circle-value');

      label.innerHTML = this.config.label;
      value.innerHTML = this.config.data.total;
console.log(this.config.data.total)
    }, // setChartMeta()

    /**
      * Create wedge
      */

    createWedge: function(data) {

      var container = document.createElement('div');
      var wedge = document.createElement('div');
      var extension = document.createElement('div');
      var label = document.createElement('div');
      var value = document.createElement('span');

      container.setAttribute('data-wedge-id', data.id);

      container.className = 'wedge-container';
      wedge.className = 'wedge';
      extension.className = 'wedge-extension';
      label.className = 'wedge-label';
      value.className = 'wedge-value';

      container.appendChild(wedge);
      container.appendChild(extension);
      container.appendChild(label);
      label.appendChild(value);

      return container;

    }, // createWedge()

    /**
      * Set wedge
      */

    setWedge: function(data) {

      var container = this.config.container.querySelector('[data-wedge-id="' + data.id + '"]');
      var wedge = container.querySelector('.wedge');
      var extension = container.querySelector('.wedge-extension');
      var label = container.querySelector('.wedge-label');
      var value = container.querySelector('.wedge-value');

      var wedgeDegrees = (360 * data.value) / this.config.data.total;
      var labelDegrees = wedgeDegrees / 2;
      var w = container.offsetWidth;

      container.style.transform = 'rotate(' + this.config.offset + 'deg)';
      container.style.webkitTransform = 'rotate(' + this.config.offset + 'deg)';
      container.style.clip = wedgeDegrees > 180 ? 'auto' : 'rect(0, ' + w + 'px, ' + w +'px, ' + (w / 2) + 'px)';

      wedge.style.transform = 'rotate(' + wedgeDegrees + 'deg)';
      wedge.style.webkitTransform = 'rotate(' + wedgeDegrees + 'deg)';
      wedge.style.backgroundColor = this.color(data.color, 5);
      wedge.style.clip = 'rect(0, ' + (w / 2) + 'px, ' + w +'px, 0)';

      if (wedgeDegrees > 180) {
        extension.style.opacity = 1;
        extension.style.transform = 'rotate(' + 180 + 'deg)';
        extension.style.webkitTransform = 'rotate(' + 180 + 'deg)';
        extension.style.backgroundColor = this.color(data.color, 5);
        extension.style.clip = 'rect(0, ' + (w / 2) + 'px, ' + w +'px, 0)';
      } else {
        extension.style.opacity = 0;
      }

      label.style.transform = 'rotate(' + labelDegrees + 'deg)';
      label.style.webkitTransform = 'rotate(' + labelDegrees + 'deg)';
      label.style.color = this.color(data.color, -30);

      value.innerHTML = data.value;

      this.config.offset += wedgeDegrees;

    }, // setWedge()

    /**
      * Color Utility
      */

    color: function( color, percent ) {

      var num = parseInt(color.slice(1), 16);
      var amt = Math.round(2.55 * percent);
      var R = (num >> 16) + amt;
      var B = (num >> 8 & 0x00FF) + amt;
      var G = (num & 0x0000FF) + amt;

      return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);

    } // color()

  }; // DonutChart

  window.DonutChart = DonutChart;

})(window, document);





// Calculator File

$(document).ready(function(){
//bracket[0] = min income, bracket[1] = max income, bracket[2] = tax 

function taxCalc(bracket, income){
   var total = 0;
    for(var key in bracket){
      if (income > bracket[key][0] || income == bracket[key][0]){
          if (income < bracket[key][1] || income == bracket[key][1] ){
              total = total + (income - bracket[key][0]) * bracket[key][2];
              
          }
          else{
                total = total + (bracket[key][1] - bracket[key][0]) * bracket[key][2]
              }
      }
      else{
        break;
      }
    }
  
  return total;
}
//round to the nearest penny
function roundPenny(num){
 return Math.round((num + Number.EPSILON) * 100) / 100
}
function fedCalc(fedBracket, income){
  return taxCalc(fedBracket, income);
}

function stateCalc(stateBracket, income){
  return taxCalc(stateBracket, income);
}

function ficaCalc(ficaBracket, income){
  return taxCalc(ficaBracket, income);
}

var showWork = {
  agi: 0,
  totalFed: 0,
  totalState: 0,
  totalFica: 0
  }

function stateTaxController(year,state,status,income){
  let stateTax = 0;

  let oldalaStateBracketSingle = {one:[0,500,.02], two: [501, 3000, .04], three: [3001, Infinity, .05] }
  let oldalaStateBracketJoint = {one:[0,1000,.02], two: [1001, 6000, .04], three: [6001, Infinity, .05] }
  let newalaStateBracketSingle = {one:[0,500,.02], two: [501, 3000, .04], three: [3001, Infinity, .05] }
  let newalaStateBracketJoint = {one:[0,1000,.02], two: [1001, 6000, .04], three: [6001, Infinity, .05] }

  let alaskaStateBracket = {one:[0,0,0]}

  let oldarizStateBracketSingle = {one:[0,11047,.0259], two: [11047, 27614, .0288], three: [27615, 55226 , .0336], four: [55227, 165674 , .0424], five: [165675, Infinity, .0454] }
  let oldarizStateBracketJoint = {one:[0,22092,.0259], two: [22093, 55226, .0288], three: [55227, 110450 , .0336], four: [110451, 331346 , .0454], five: [165675, Infinity, .0454] }
  let newarizStateBracketSingle = {one:[0,26500,.0259], two: [26501, 53000, .0334], three: [53001, 159000 , .0417], four: [159001, Infinity , .045] }
  let newarizStateBracketJoint = {one:[0,53000,.0259], two: [53001, 106000, .0334], three: [106001, 318000 , .0417], four: [318001, Infinity , .045] }

  let oldarkStateBracketSingle = {one:[0,4500,.009], two: [4501, 8900, .0250], three: [8901, 13400 , .0350], four: [13401, 22200 , .0450], five: [22201, 37200, .05], six: [37200, Infinity, .0690] }
  let oldarkStateBracketJoint = {one:[0,4500,.009], two: [4501, 8900, .0250], three: [8901, 13400 , .0350], four: [13401, 22200 , .0450], five: [22201, 37200, .05], six: [37200, Infinity, .0690] }
  let newarkStateBracketSingle = {one:[0,4000,.02], two: [4001, 8000, .04], three: [8001, 79300 , .059], four: [79301, Infinity , .066]}
  let newarkStateBracketJoint = {one:[0,4000,.02], two: [4001, 8000, .04], three: [8001, 79300 , .059], four: [79301, Infinity , .066]}

  let oldcaliStateBracketSingle = {one:[0,8544,.01], two: [8545, 20255, .02], three: [20256, 31969, .04],four: [31970,44377, .06], five: [44378,56085, .08], six: [56086,286492, .0930], seven: [286493, 343788 , .1030], eight: [343789, 572980, .1130], nine: [572981, 1000000, .1230], ten: [1000001, Infinity, .1330] }
  let oldcaliStateBracketJoint = {one:[0,17088,.01], two: [17089, 40510, .02], three: [40511, 62938, .04],four: [62939,88754, .06], five: [88755,112170, .08], six: [112171,572984, .0930], seven: [572985, 687576 , .1030], eight: [687577, 1000000, .1130], nine: [1000001, 1145960, .1230], ten: [1145961, Infinity, .1330] }
  let newcaliStateBracketSingle = {one:[0,8809,.01], two: [8810, 20883, .02], three: [20884, 32960, .04],four: [32961,45753, .06], five: [45754,57824, .08], six: [57825,295373, .0930], seven: [295374, 354445 , .1030], eight: [354446, 590742, .1130], nine: [590743, 1000000, .1230], ten: [1000001, Infinity, .1330] }
  let newcaliStateBracketJoint = {one:[0,17618,.01], two: [17619, 41766, .02], three: [41767, 65920, .04],four: [65921,91506, .06], five: [91507,115648, .08], six: [115649,590746, .0930], seven: [590747, 708890, .1030], eight: [708891, 1000000, .1130], nine: [1000001, 1181484, .1230], ten: [1181485, Infinity, .1330] }


  let coloStateBracket = {one:[0,Infinity,.0463] }

  let oldconnStateBracketSingle = {one:[0,10000,.03], two: [10001, 50000, .05], three: [50001, 100000, .055], four: [100001, 200000 , .06], five: [200001, 250000, .065], six: [250001, 500000, .069], seven: [500001, Infinity, .0699] }
  let oldconnStateBracketJoint = {one:[0,20000,.03], two: [20001, 100000, .05], three: [100001, 200000, .055], four: [200001, 400000 , .06], five: [400001, 500000, .065], six: [500001, 1000000, .069], seven: [1000001, Infinity, .0699] }
  let newconnStateBracketSingle = {one:[0,10000,.03], two: [10001, 50000, .05], three: [50001, 100000, .055], four: [100001, 200000 , .06], five: [200001, 250000, .065], six: [250001, 500000, .069], seven: [500001, Infinity, .0699] }
  let newconnStateBracketJoint = {one:[0,20000,.03], two: [20001, 100000, .05], three: [100001, 200000, .055], four: [200001, 400000 , .06], five: [400001, 500000, .065], six: [500001, 1000000, .069], seven: [1000001, Infinity, .0699] }

  let olddelStateBracketSingle = {one: [2000, 5000, .022], three: [5001, 10000, .039], four: [10001, 20000 , .048], five: [20001, 25000, .052], six: [25001, 60000, .0555], seven: [60001, Infinity, .0699] }
  let olddelStateBracketJoint = {one: [2000, 5000, .022], three: [5001, 10000, .039], four: [10001, 20000 , .048], five: [20001, 25000, .052], six: [25001, 60000, .0555], seven: [60001, Infinity, .0699] }
  let newdelStateBracketSingle = {one: [2000, 5000, .022], three: [5001, 10000, .039], four: [10001, 20000 , .048], five: [20001, 25000, .052], six: [25001, 60000, .0555], seven: [60001, Infinity, .0699] }
  let newdelStateBracketJoint = {one: [2000, 5000, .022], three: [5001, 10000, .039], four: [10001, 20000 , .048], five: [20001, 25000, .052], six: [25001, 60000, .0555], seven: [60001, Infinity, .0699] }


  let flaStateBracket = {one: [0,0,0]}

  let oldgaStateBracketSingle = {one: [0, 750, .01], three: [751, 2250, .02], four: [2251, 3750 , .03], five: [3751, 5250, .04], six: [5251, 7000, .05], seven: [7001, Infinity, .0575] }
  let oldgaStateBracketJoint = {one: [0, 1000, .01], three: [1001, 3000, .02], four: [3001, 5000 , .03], five: [5001, 7000, .04], six: [7001, 10000, .05], seven: [10001, Infinity, .0575] }
  let newgaStateBracketSingle = {one: [0, 750, .01], three: [751, 2250, .02], four: [2251, 3750 , .03], five: [3751, 5250, .04], six: [5251, 7000, .05], seven: [7001, Infinity, .0575] }
  let newgaStateBracketJoint = {one: [0, 1000, .01], three: [1001, 3000, .02], four: [3001, 5000 , .03], five: [5001, 7000, .04], six: [7001, 10000, .05], seven: [10001, Infinity, .0575] }

  let oldhawaiiStateBracketSingle = {one:[0,2400,.014], two: [2401, 4800, .032], three: [4801, 9600, .055],four: [9601,14400, .064], five: [14401,19200, .068], six: [19201,24000, .072], seven: [24001, 36000 , .076], eight: [36001, 48000, .079], nine: [48001, 150000, .0825], ten: [150001, 175000, .09], eleven: [175001, 200000, .10], twelve: [200000, Infinity, .11] }
  let oldhawaiiStateBracketJoint = {one:[0,4800,.014], two: [4801, 9600, .032], three: [9601, 19200, .055],four: [19201,28800, .064], five: [28801,38400, .068], six: [38401,48000, .072], seven: [48001, 72000 , .076], eight: [72001, 96000, .079], nine: [96001, 300000, .0825], ten: [300001, 350000, .09], eleven: [350001, 400000, .10], twelve: [400000, Infinity, .11] }
  let newhawaiiStateBracketSingle = {one:[0,2400,.014], two: [2401, 4800, .032], three: [4801, 9600, .055],four: [9601,14400, .064], five: [14401,19200, .068], six: [19201,24000, .072], seven: [24001, 36000 , .076], eight: [36001, 48000, .079], nine: [48001, 150000, .0825], ten: [150001, 175000, .09], eleven: [175001, 200000, .10], twelve: [200000, Infinity, .11] }
  let newhawaiiStateBracketJoint = {one:[0,4800,.014], two: [4801, 9600, .032], three: [9601, 19200, .055],four: [19201,28800, .064], five: [28801,38400, .068], six: [38401,48000, .072], seven: [48001, 72000 , .076], eight: [72001, 96000, .079], nine: [96001, 300000, .0825], ten: [300001, 350000, .09], eleven: [350001, 400000, .10], twelve: [400000, Infinity, .11] }

  let oldidahoStateBracketSingle = {one: [0, 1541, .01125], two: [1541, 3081, .03125], three: [3082, 4622 , .03625], four: [4623, 6162, .04625], five: [6163, 7703, .05625], six: [7704, 11554, .06625], seven: [11555, Infinity, .06925] }
  let oldidahoStateBracketJoint = {one: [0, 3081, .01125], three: [3082, 6162, .03125], four: [6163, 9243 , .03625], five: [9244, 12324, .04625], six: [12325, 15405, .05625], seven: [15406, 23108, .06625], eight: [23109, Infinity, .06925] }
  let newidahoStateBracketSingle = {one: [0, 1541, .01125], two: [1541, 3081, .03125], three: [3082, 4622 , .03625], four: [4623, 6162, .04625], five: [6163, 7703, .05625], six: [7704, 11554, .06625], seven: [11555, Infinity, .06925] }
  let newidahoStateBracketJoint = {one: [0, 3081, .01125], three: [3082, 6162, .03125], four: [6163, 9243 , .03625], five: [9244, 12324, .04625], six: [12325, 15405, .05625], seven: [15406, 23108, .06625], eight: [23109, Infinity, .06925] }



  let illStateBracket = {one: [0, Infinity, .0495]}
  let indStateBracket = {one: [0, Infinity, .0323]}

  let oldiowaStateBracketSingle = {one: [0, 1638, .0033], three: [1639, 3276, .0067], four: [3277, 6552 , .0225], five: [6553, 14742, .0414], six: [14743, 24570, .0562], seven: [24571, 32760, .0596], eight: [32761, 49140, .0625], nine: [49141, 73710, .0744], ten: [73711, Infinity, .0853] }
  let oldiowaStateBracketJoint = {one: [0, 1638, .0033], three: [1639, 3276, .0067], four: [3277, 6552 , .0225], five: [6553, 14742, .0414], six: [14743, 24570, .0562], seven: [24571, 32760, .0596], eight: [32761, 49140, .0625], nine: [49141, 73710, .0744], ten: [73711, Infinity, .0853] }
  let newiowaStateBracketSingle = {one: [0, 1638, .0033], three: [1639, 3276, .0067], four: [3277, 6552 , .0225], five: [6553, 14742, .0414], six: [14743, 24570, .0562], seven: [24571, 32760, .0596], eight: [32761, 49140, .0625], nine: [49141, 73710, .0744], ten: [73711, Infinity, .0853] }
  let newiowaStateBracketJoint = {one: [0, 1638, .0033], three: [1639, 3276, .0067], four: [3277, 6552 , .0225], five: [6553, 14742, .0414], six: [14743, 24570, .0562], seven: [24571, 32760, .0596], eight: [32761, 49140, .0625], nine: [49141, 73710, .0744], ten: [73711, Infinity, .0853] }


  let oldkansStateBracketSingle = {one: [2500, 15000, .031], three: [15001, 30000, .0525], four: [30001, Infinity , .057] }
  let oldkansStateBracketJoint = {one: [5000, 30000, .031], three: [30001, 60000, .0525], four: [60001, Infinity , .057] }
  let newkansStateBracketSingle = {one: [0, 15000, .031], three: [15001, 30000, .0525], four: [30001, Infinity , .057] }
  let newkansStateBracketJoint = {one: [0, 30000, .031], three: [30001, 60000, .0525], four: [60001, Infinity , .057] }

  let kyStateBracket = {one: [0, Infinity, .05]}

  let oldlaStateBracketSingle = {one: [0, 12500, .02], three: [12501, 50000, .04], four: [50001, Infinity , .06] }
  let oldlaStateBracketJoint = {one: [0, 25000, .02], three: [25001, 100000, .04], four: [100001, Infinity , .06] }
  let newlaStateBracketSingle = {one: [0, 12500, .02], three: [12501, 50000, .04], four: [50001, Infinity , .06] }
  let newlaStateBracketJoint = {one: [0, 25000, .02], three: [25001, 100000, .04], four: [100001, Infinity , .06] }

  let oldmaineStateBracketSingle = {one: [0, 21850, .058], three: [21851, 51700, .0675], four: [51701, Infinity , .0715] }
  let oldmaineStateBracketJoint = {one: [0, 43700, .058], three: [43701, 103400, .0675], four: [103401, Infinity , .0715] }
  let newmaineStateBracketSingle = {one: [0, 22200, .058], three: [22201, 52600, .0675], four: [52601, Infinity , .0715] }
  let newmaineStateBracketJoint = {one: [0, 44450, .058], three: [44451, 105200, .0675], four: [105201, Infinity , .0715] }

  let oldmdStateBracketSingle = {one: [0, 1000, .02], three: [1001, 2000, .03], four: [2001, 3000 , .04], five: [3001, 100000, .0475], six: [100001, 125000, .05], seven: [125001, 150000, .0525], eight: [150001, 250000, .055], nine: [250001, Infinity, .0575] }
  let oldmdStateBracketJoint = {one: [0, 1000, .02], three: [1001, 2000, .03], four: [2001, 3000 , .04], five: [3001, 150000, .0475], six: [150001, 175000, .05], seven: [175001, 225000, .0525], eight: [225001, 300000, .055], nine: [300001, Infinity, .0575] }
  let newmdStateBracketSingle = {one: [0, 1000, .02], three: [1001, 2000, .03], four: [2001, 3000 , .04], five: [3001, 100000, .0475], six: [100001, 125000, .05], seven: [125001, 150000, .0525], eight: [150001, 250000, .055], nine: [250001, Infinity, .0575] }
  let newmdStateBracketJoint = {one: [0, 1000, .02], three: [1001, 2000, .03], four: [2001, 3000 , .04], five: [3001, 150000, .0475], six: [150001, 175000, .05], seven: [175001, 225000, .0525], eight: [225001, 300000, .055], nine: [300001, Infinity, .0575] }

  let massStateBracket = {one: [0, Infinity, .0505]}
  let michStateBracket = {one: [0, Infinity, .0425]}

  let oldminnStateBracketSingle = {one: [0, 26960, .0535], three: [26961, 88550, .0705], four: [88551, 164400 , .0785], five: [164401, Infinity, .0985] }
  let oldminnStateBracketJoint = {one: [0, 39410, .0535], three: [39411, 156570, .0705], four: [156571, 273470, .0785], five: [273470, Infinity, .0985] }
  let newminnStateBracketSingle = {one: [0, 26960, .0535], three: [26961, 88550, .0705], four: [88551, 164400 , .0785], five: [164401, Infinity, .0985] }
  let newminnStateBracketJoint = {one: [0, 39410, .0535], three: [39411, 156570, .0705], four: [156571, 273470, .0785], five: [273470, Infinity, .0985] }

  let oldmissStateBracketSingle = {one: [1000, 5000, .03], three: [5001, 10000, .04], four: [10001, Infinity , .05] }
  let oldmissStateBracketJoint = {one: [1000, 5000, .03], three: [5001, 10000, .04], four: [10001, Infinity , .00] }
  let newmissStateBracketSingle = {one: [1000, 5000, .03], three: [5001, 10000, .04], four: [10001, Infinity , .05] }
  let newmissStateBracketJoint = {one: [1000, 5000, .03], three: [5001, 10000, .04], four: [10001, Infinity , .00] }

  let oldmoStateBracketSingle = {one: [0, 1053, .015], three: [1054, 2106, .02], four: [2107, 3159 , .025], five: [3160, 4212, .03], six: [4213, 5265, .035], seven: [5266, 6318, .04], eight: [6319, 7371, .045], nine: [7372, 8424, .05], ten: [8425, Infinity, .054] }
  let oldmoStateBracketJoint = {one: [0, 1053, .015], three: [1054, 2106, .02], four: [2107, 3159 , .025], five: [3160, 4212, .03], six: [4213, 5265, .035], seven: [5266, 6318, .04], eight: [6319, 7371, .045], nine: [7372, 8424, .05], ten: [8425, Infinity, .054] }
  let newmoStateBracketSingle = {one: [0, 1053, .015], three: [1054, 2106, .02], four: [2107, 3159 , .025], five: [3160, 4212, .03], six: [4213, 5265, .035], seven: [5266, 6318, .04], eight: [6319, 7371, .045], nine: [7372, 8424, .05], ten: [8425, Infinity, .054] }
  let newmoStateBracketJoint = {one: [0, 1053, .015], three: [1054, 2106, .02], four: [2107, 3159 , .025], five: [3160, 4212, .03], six: [4213, 5265, .035], seven: [5266, 6318, .04], eight: [6319, 7371, .045], nine: [7372, 8424, .05], ten: [8425, Infinity, .054] }

  let oldmontStateBracketSingle = {one: [0, 3100, .01], three: [3101, 5400, .02], four: [5401, 8200 , .03], five: [8201, 11100, .04], six: [11101, 14300, .05], seven: [14301, 18400, .06], eight: [18401, Infinity, .069] }
  let oldmontStateBracketJoint = {one: [0, 3100, .01], three: [3101, 5400, .02], four: [5401, 8200 , .03], five: [8201, 11100, .04], six: [11101, 14300, .05], seven: [14301, 18400, .06], eight: [18401, Infinity, .069] }
  let newmontStateBracketSingle = {one: [0, 3100, .01], three: [3101, 5400, .02], four: [5401, 8200 , .03], five: [8201, 11100, .04], six: [11101, 14300, .05], seven: [14301, 18400, .06], eight: [18401, Infinity, .069] }
  let newmontStateBracketJoint = {one: [0, 3100, .01], three: [3101, 5400, .02], four: [5401, 8200 , .03], five: [8201, 11100, .04], six: [11101, 14300, .05], seven: [14301, 18400, .06], eight: [18401, Infinity, .069] }

  let oldnebrStateBracketSingle = {one: [0, 3290, .0246], three: [3291, 19720, .0351], four: [19721, 31780, .0501], five: [31781, Infinity, .0684] }
  let oldnebrStateBracketJoint = {one: [0, 6570, .0246], three: [6571, 39450, .0351], four: [39451, 63550, .0501], five: [63551, Infinity, .0684] }
  let newnebrStateBracketSingle = {one: [0, 3290, .0246], three: [3291, 19700, .0351], four: [19701, 31750, .0501], five: [31751, Infinity, .0684] }
  let newnebrStateBracketJoint = {one: [0, 6570, .0246], three: [6571, 39410, .0351], four: [39411, 63500, .0501], five: [63501, Infinity, .0684] }

  let nhStateBracket = {one: [0, Infinity, .005]}

  let oldnjStateBracketSingle = {one: [0, 20000, .014], three: [20001, 35000, .0175], four: [35001, 40000 , .035], five: [40001, 75000, .05525], six: [75001, 500000, .0637], seven: [500001, 5000000, .0897], eight: [5000001, Infinity, .1075] }
  let oldnjStateBracketJoint = {one: [0, 20000, .014], three: [20001, 50000, .0175], four: [50001, 70000 , .0245], five: [70001, 80000, .035], six: [80001, 150000, .05525], seven: [150001, 500000, .0637], eight: [500001, 5000000, .0897], nine: [5000001, Infinity, .1075] }
  let newnjStateBracketSingle = {one: [0, 20000, .014], three: [20001, 35000, .0175], four: [35001, 40000 , .035], five: [40001, 75000, .05525], six: [75001, 500000, .0637], seven: [500001, 5000000, .0897], eight: [5000001, Infinity, .1075] }
  let newnjStateBracketJoint = {one: [0, 20000, .014], three: [20001, 50000, .0175], four: [50001, 70000 , .0245], five: [70001, 80000, .035], six: [80001, 150000, .05525], seven: [150001, 500000, .0637], eight: [500001, 5000000, .0897], nine: [5000001, Infinity, .1075] }

  let oldnmStateBracketSingle = {one: [0, 5500, .017], three: [5501, 11000, .032], four: [11001, 16000, .047], five: [16001, Infinity, .049] }
  let oldnmStateBracketJoint = {one: [0, 8000, .017], three: [8001, 16000, .032], four: [16001, 24000, .047], five: [24001, Infinity, .049] }
  let newnmStateBracketSingle = {one: [0, 5500, .017], three: [5501, 11000, .032], four: [11001, 16000, .047], five: [16001, Infinity, .049] }
  let newnmStateBracketJoint = {one: [0, 8000, .017], three: [8001, 16000, .032], four: [16001, 24000, .047], five: [24001, Infinity, .049] }

  let oldnyStateBracketSingle = {one:[0,8500,.04], two: [8501, 11700, .045], three: [11701, 13900, .0525],four: [13901,21400, .059], five: [21401,80650, .0633], six: [80651,215400, .0657], seven: [215401, 1077550 , .0685], eight: [1077551, Infinity, .0882] }
  let oldnyStateBracketJoint = {one:[0,17150,.04], two: [17151, 23600, .045], three: [23601, 27900, .0525],four: [27901,43000, .059], five: [43001,161550, .0633], six: [161551,323200, .0657], seven: [323201, 2155350 , .0685], eight: [2155351, Infinity, .0882] }
  let newnyStateBracketSingle = {one:[0,8500,.04], two: [8501, 11700, .045], three: [11701, 13900, .0525],four: [13901,21400, .059], five: [21401,80650, .0633], six: [80651,215400, .0657], seven: [215401, 1077550 , .0685], eight: [1077551, Infinity, .0882] }
  let newnyStateBracketJoint = {one:[0,17150,.04], two: [17151, 23600, .045], three: [23601, 27900, .0525],four: [27901,43000, .059], five: [43001,161550, .0633], six: [161551,323200, .0657], seven: [323201, 2155350 , .0685], eight: [2155351, Infinity, .0882] }

  let ncStateBracket = {one: [0, Infinity, .0525]}

  let oldndStateBracketSingle = {one: [0, 39450, .011], three: [39451, 95500, .0204], four: [95501, 199250, .0227], five: [199250, 433200, .0264], six: [433201, Infinity, .029] }
  let oldndStateBracketJoint = {one: [0, 65900, .011], three: [65901, 159200, .0204], four: [159201, 242550, .0227], five: [242551, 433200, .0264], six: [433201, Infinity, .029] }
  let newndStateBracketSingle = {one: [0, 39450, .011], three: [39451, 95500, .0204], four: [95501, 199250, .0227], five: [199250, 433200, .0264], six: [433201, Infinity, .029] }
  let newndStateBracketJoint = {one: [0, 65900, .011], three: [65901, 159200, .0204], four: [159201, 242550, .0227], five: [242551, 433200, .0264], six: [433201, Infinity, .029] }

  let oldohioStateBracketSingle = {one:[10850,16300,.0198], two: [16301, 21750, .02746], three: [21751, 43450, .02969],four: [43451,86900, .03465], five: [86901,108700, .0396], six: [108701,217400, .04597], seven: [217401,Infinity, .04997] }
  let oldohioStateBracketJoint = {one:[10850,16300,.0198], two: [16301, 21750, .02746], three: [21751, 43450, .02969],four: [43451,86900, .03465], five: [86901,108700, .0396], six: [108701,217400, .04597], seven: [217401,Infinity, .04997] }
  let newohioStateBracketSingle = {one:[21750,43450,.0285], two: [43451, 86900, .03326], three: [86901, 108700, .03082],four: [108701,217400, .04413], five: [217401,Infinity, .04797]}
  let newohioStateBracketJoint = {one:[21750,43450,.0285], two: [43451, 86900, .03326], three: [86901, 108700, .03082],four: [108701,217400, .04413], five: [217401,Infinity, .04797]}

  let oldoklaStateBracketSingle = {one:[0,1000,.005], two: [1001, 2500, .01], three: [2501, 3750, .02],four: [3751,4900, .03], five: [4901,7200, .04], six: [7201,Infinity, .05] }
  let oldoklaStateBracketJoint = {one:[0,2000,.005], two: [2001, 5000, .01], three: [5001, 7500, .02],four: [7501,9800, .03], five: [9801,12200, .04], six: [12201,Infinity, .05] }
  let newoklaStateBracketSingle = {one:[0,1000,.005], two: [1001, 2500, .01], three: [2501, 3750, .02],four: [3751,4900, .03], five: [4901,7200, .04], six: [7201,Infinity, .05] }
  let newoklaStateBracketJoint = {one:[0,2000,.005], two: [2001, 5000, .01], three: [5001, 7500, .02],four: [7501,9800, .03], five: [9801,12200, .04], six: [12201,Infinity, .05] }

  let oldoreStateBracketSingle = {one:[0,3550,.05], two: [3551, 8900, .07], three: [8901, 125000, .09],four: [125001,Infinity, .099]}
  let oldoreStateBracketJoint = {one:[0,7100,.05], two: [7101, 17800, .07], three: [17801, 250000, .09],four: [250001,Infinity, .099]}
  let neworeStateBracketSingle = {one:[0,3550,.05], two: [3551, 8900, .07], three: [8901, 125000, .09],four: [125001,Infinity, .099]}
  let neworeStateBracketJoint = {one:[0,7100,.05], two: [7101, 17800, .07], three: [17801, 250000, .09],four: [250001,Infinity, .099]}

  let paStateBracket = {one: [0, Infinity, .0307]}

  let oldriStateBracketSingle = {one:[0,64050,.0375], two: [64051, 145600, .0475], three: [145601, Infinity, .0599]}
  let oldriStateBracketJoint = {one:[0,64050,.0375], two: [64051, 145600, .0475], three: [145601, Infinity, .0599]}
  let newriStateBracketSingle = {one:[0,65250,.0375], two: [65251, 148350, .0475], three: [148351, Infinity, .0599]}
  let newriStateBracketJoint = {one:[0,65250,.0375], two: [65251, 148350, .0475], three: [148351, Infinity, .0599]}

  let oldscStateBracketSingle = {one:[0,2450,.011], two: [2451, 4900, .03], three: [4901, 7350, .04],four: [7351,9800, .05], five: [9801,12250, .06], six: [12251,Infinity, .07] }
  let oldscStateBracketJoint = {one:[0,2450,.011], two: [2451, 4900, .03], three: [4901, 7350, .04],four: [7351,9800, .05], five: [9801,12250, .06], six: [12251,Infinity, .07] }
  let newscStateBracketSingle = {one:[0,3070,.0], two: [3071, 6150, .03], three: [6151, 9230, .04],four: [9231,12310, .05], five: [12311,15400, .06], six: [15401,Infinity, .07]}
  let newscStateBracketJoint = {one:[0,3070,.0], two: [3071, 6150, .03], three: [6151, 9230, .04],four: [9231,12310, .05], five: [12311,15400, .06], six: [15401,Infinity, .07]}

  let sdStateBracket = {one: [0, 0, 0]}
  let tennStateBracket = {one: [0, Infinity, .02]}
  let texStateBracket = {one: [0, 0, 0]}
  let utahStateBracket = {one: [0, Infinity, .0495]}

  let oldvtStateBracketSingle = {one:[0,39600,.0335], two: [39601, 95900, .066], three: [95901, 200100, .076],four: [200101,416650, .0875], five: [416651,Infinity, .0895] }
  let oldvtStateBracketJoint = {one:[0,39600,.0335], two: [39601, 95900, .066], three: [95901, 200100, .076],four: [200101,416650, .0875], five: [416651,Infinity, .0895] }
  let newvtStateBracketSingle = {one:[0,39600,.0335], two: [39601, 95900, .066], three: [95901, 200100, .076],four: [200101,416650, .0875], five: [416651,Infinity, .0895] }
  let newvtStateBracketJoint = {one:[0,39600,.0335], two: [39601, 95900, .066], three: [95901, 200100, .076],four: [200101,416650, .0875], five: [416651,Infinity, .0895] }

  let oldvaStateBracketSingle = {one:[0,3000,.02], two: [3001, 5000, .03], three: [5001, 17000, .05],four: [17001,Infinity, .0575] }
  let oldvaStateBracketJoint = {one:[0,3000,.02], two: [3001, 5000, .03], three: [5001, 17000, .05],four: [17001,Infinity, .0575] }
  let newvaStateBracketSingle = {one:[0,3000,.02], two: [3001, 5000, .03], three: [5001, 17000, .05],four: [17001,Infinity, .0575] }
  let newvaStateBracketJoint = {one:[0,3000,.02], two: [3001, 5000, .03], three: [5001, 17000, .05],four: [17001,Infinity, .0575] }

  let washStateBracket = {one: [0, 0, 0]}

  let oldwvaStateBracketSingle = {one:[0,10000,.03], two: [10001, 25000, .04], three: [25001, 40000, .045],four: [40001,60000, .06], five: [60001,Infinity, .065] }
  let oldwvaStateBracketJoint = {one:[0,10000,.03], two: [10001, 25000, .04], three: [25001, 40000, .045],four: [40001,60000, .06], five: [60001,Infinity, .065] }
  let newwvaStateBracketSingle = {one:[0,10000,.03], two: [10001, 25000, .04], three: [25001, 40000, .045],four: [40001,60000, .06], five: [60001,Infinity, .065] }
  let newwvaStateBracketJoint = {one:[0,10000,.03], two: [10001, 25000, .04], three: [25001, 40000, .045],four: [40001,60000, .06], five: [60001,Infinity, .065] }


  let oldwisStateBracketSingle = {one:[0,11760,.04], two: [11761, 23520, .0584], three: [23521, 258950, .0627], four: [258951, Infinity, .0765] }
  let oldwisStateBracketJoint = {one:[0,15680,.04], two: [15681, 31360, .0584], three: [31361, 345270, .0627], four: [345271, Infinity, .0765] }
  let newwisStateBracketSingle = {one:[0,11970,.04], two: [11971, 23930, .0584], three: [23931, 263480, .0627], four: [263481, Infinity, .0765] }
  let newwisStateBracketJoint = {one:[0,15960,.04], two: [15961, 31910, .0584], three: [31911, 351310, .0627], four: [351311, Infinity, .0765] }

  let wyoStateBracket = {one: [0, 0, 0]}

  let olddcStateBracketSingle = {one:[0,10000,.04], two: [10001, 40000, .06], three: [40001, 60000, .065],four: [60001,350000, .085], five: [350001,1000000, .0875], six: [1000001,Infinity, .0895] }
  let olddcStateBracketJoint = {one:[0,10000,.04], two: [10001, 40000, .06], three: [40001, 60000, .065],four: [60001,350000, .085], five: [350001,1000000, .0875], six: [1000001,Infinity, .0895] }
  let newdcStateBracketSingle = {one:[0,10000,.04], two: [10001, 40000, .06], three: [40001, 60000, .065],four: [60001,350000, .085], five: [350001,1000000, .0875], six: [1000001,Infinity, .0895] }
  let newdcStateBracketJoint = {one:[0,10000,.04], two: [10001, 40000, .06], three: [40001, 60000, .065],four: [60001,350000, .085], five: [350001,1000000, .0875], six: [1000001,Infinity, .0895] }
 
  if(year =="2019"){
    if(state =="Ala."){
       if(status =="Single"){
        stateTax = taxCalc(oldalaStateBracketSingle,income)
        
      }else{
        stateTax = taxCalc(oldalaStateBracketJoint,income)
      }
    }
    else if(state =="Alaska"){
    
        stateTax = taxCalc(alaskaStateBracket,income)
    }
    else if(state =="Ariz."){
       if(status =="Single"){
        stateTax = taxCalc(oldarizStateBracketSingle,income)
      }else{
        stateTax = taxCalc(oldarizStateBracketJoint,income)
      }
    }
    else if(state =="Ark."){
       if(status =="Single"){
        stateTax = taxCalc(oldarkStateBracketSingle,income)
      }else{
        stateTax = taxCalc(oldarkStateBracketJoint,income)
      }
    }
    else if(state =="Calif."){
       if(status =="Single"){
        stateTax = taxCalc(oldcaliStateBracketSingle,income)
      }else{
        stateTax = taxCalc(oldcaliStateBracketJoint,income)
      }
    }
    else if(state =="Colo."){
      
        stateTax = taxCalc(coloStateBracket,income)
    
    }
    
    else if(state == "Conn."){
       if(status == "Single"){
        stateTax = taxCalc(oldconnStateBracketSingle,income)
      }else{
        stateTax = taxCalc(oldconnStateBracketJoint,income)
      }
    }
    else if(state == "Del."){
       if(status == "Single"){
        stateTax = taxCalc(olddelStateBracketSingle,income)
         console.log(stateTax);
      }else{
        stateTax = taxCalc(olddelStateBracketJoint,income)
      }
    }
    else if(state == "Fla."){
        stateTax = taxCalc(flaStateBracket,income)
    }
     else if(state == "Ga."){
       if(status == "Single"){
        stateTax = taxCalc(oldgaStateBracketSingle,income)
      }else{
        stateTax = taxCalc(oldgaStateBracketJoint,income)
      }
    }
    else if(state == "Hawaii"){
       if(status == "Single"){
        stateTax = taxCalc(oldhawaiiStateBracketSingle,income)
      }else{
        stateTax = taxCalc(oldhawaiiStateBracketJoint,income)
      }
    }
    else if(state == "Idaho"){
       if(status == "Single"){
        stateTax = taxCalc(oldidahoStateBracketSingle,income)
      }else{
        stateTax = taxCalc(oldidahoStateBracketJoint,income)
      }
    }
    else if(state == "Ill."){
      
        stateTax = taxCalc(illStateBracket,income)
      
    }
    else if(state == "Ind."){
    
        stateTax = taxCalc(indStateBracket,income)
    
    }
    else if(state == "Iowa"){
       if(status == "Single"){
        stateTax = taxCalc(oldiowaStateBracketSingle,income)
      }else{
        stateTax = taxCalc(oldiowaStateBracketJoint,income)
      }
    }
    else if(state == "Kans."){
       if(status == "Single"){
        stateTax = taxCalc(oldkansStateBracketSingle,income)
      }else{
        stateTax = taxCalc(oldkansStateBracketJoint,income)
      }
    }
    else if(state == "Ky."){
   
        stateTax = taxCalc(kyStateBracket,income)
  
    }
    else if(state == "Maine"){
       if(status == "Single"){
        stateTax = taxCalc(oldmaineStateBracketSingle,income)
      }else{
        stateTax = taxCalc(oldmaineStateBracketJoint,income)
      }
    }
     else if(state == "Md."){
       if(status == "Single"){
        stateTax = taxCalc(oldmdStateBracketSingle,income)
      }else{
        stateTax = taxCalc(oldmdStateBracketJoint,income)
      }
    }
    else if(state == "Mass."){
  
        stateTax = taxCalc(massStateBracket,income)
      
    }
    else if(state == "Mich."){
       
        stateTax = taxCalc(michStateBracket,income)
    }
    else if(state == "Minn."){
       if(status == "Single"){
        stateTax = taxCalc(oldminnStateBracketSingle,income)
      }else{
        stateTax = taxCalc(oldminnStateBracketJoint,income)
      }
    }
    else if(state == "Miss."){
       if(status == "Single"){
        stateTax = taxCalc(oldmissStateBracketSingle,income)
      }else{
        stateTax = taxCalc(oldmissStateBracketJoint,income)
      }
    }
    else if(state == "Mo."){
       if(status == "Single"){
        stateTax = taxCalc(oldmoStateBracketSingle,income)
      }else{
        stateTax = taxCalc(oldmoStateBracketJoint,income)
      }
    }
    else if(state == "Mont."){
       if(status == "Single"){
        stateTax = taxCalc(oldmontStateBracketSingle,income)
      }else{
        stateTax = taxCalc(oldmontStateBracketJoint,income)
      }
    }
    else if(state == "Nebr."){
       if(status == "Single"){
        stateTax = taxCalc(oldnebrStateBracketSingle,income)
      }else{
        stateTax = taxCalc(oldnebrStateBracketJoint,income)
      }
    }
    else if(state == "Nev."){
       
        stateTax = taxCalc(nev)

    }
     else if(state == "N.H."){
     
        stateTax = taxCalc(nhStateBracket,income)
     
    }
    else if(state == "N.J."){
       if(status == "Single"){
        stateTax = taxCalc(oldnjStateBracketSingle,income)
      }else{
        stateTax = taxCalc(oldnjStateBracketJoint,income)
      }
    }
    else if(state == "N.M."){
       if(status == "Single"){
        stateTax = taxCalc(oldnmStateBracketSingle,income)
      }else{
        stateTax = taxCalc(oldnmStateBracketJoint,income)
      }
    }
    else if(state == "N.Y."){
       if(status == "Single"){
        stateTax = taxCalc(oldnyStateBracketSingle,income)
      }else{
        stateTax = taxCalc(oldnyStateBracketJoint,income)
      }
    }
    else if(state == "N.C."){
    
        stateTax = taxCalc(ncStateBracket,income)
    }
    else if(state == "N.D."){
       if(status == "Single"){
        stateTax = taxCalc(oldndStateBracketSingle,income)
      }else{
        stateTax = taxCalc(oldndStateBracketJoint,income)
      }
    }
    else if(state == "Ohio"){
       if(status == "Single"){
        stateTax = taxCalc(oldohioStateBracketSingle,income)
      }else{
        stateTax = taxCalc(oldohioStateBracketJoint,income)
      }
    }
    else if(state == "Okla."){
       if(status == "Single"){
        stateTax = taxCalc(oldoklaStateBracketSingle,income)
      }else{
        stateTax = taxCalc(oldoklaStateBracketJoint,income)
      }
    }
    else if(state == "Ore."){
       if(status == "Single"){
        stateTax = taxCalc(oldoreStateBracketSingle,income)
      }else{
        stateTax = taxCalc(oldoreStateBracketJoint,income)
      }
    }
     else if(state == "Pa."){

        stateTax = taxCalc(paStateBracket,income)
     
    }
    else if(state == "R.I."){
       if(status == "Single"){
        stateTax = taxCalc(oldriStateBracketSingle,income)
      }else{
        stateTax = taxCalc(oldriStateBracketJoint,income)
      }
    }
    else if(state == "S.C."){
       if(status == "Single"){
        stateTax = taxCalc(oldscStateBracketSingle,income)
      }else{
        stateTax = taxCalc(oldscStateBracketJoint,income)
      }
    }
    else if(state == "S.D."){
   
        stateTax = taxCalc(sdStateBracket,income)
     
    }
    else if(state == "Tenn."){
   
        stateTax = taxCalc(tennStateBracket,income)
     
    }
    else if(state == "Tex."){
       
        stateTax = taxCalc(texStateBracket,income)
      
    }
    else if(state == "Utah"){
  
        stateTax = taxCalc(utahStateBracket,income)
    
    }
    else if(state == "Vt."){
       if(status == "Single"){
        stateTax = taxCalc(oldvtStateBracketSingle,income)
      }else{
        stateTax = taxCalc(oldvtStateBracketJoint,income)
      }
    }
    else if(state == "Va."){
       if(status="Single"){
        stateTax = taxCalc(oldvaStateBracketSingle,income)
      }else{
        stateTax = taxCalc(oldvaStateBracketJoint,income)
      }
    }
    else if(state =="Wash."){
        stateTax = taxCalc(washStateBracket,income)
    }
    else if(state =="W.Va."){
       if(status="Single"){
        stateTax = taxCalc(oldwvaStateBracketSingle,income)
      }else{
        stateTax = taxCalc(oldwvaStateBracketJoint,income)
      }
    }
    else if(state == "Wis."){
       if(status == "Single"){
        stateTax = taxCalc(oldwisStateBracketSingle,income)
      }else{
        stateTax = taxCalc(oldwisStateBracketJoint,income)
      }
    }
    else if(state == "Wyo."){
        stateTax = taxCalc(wyoStateBracket,income)  
    }
    else if(state =="D.C."){
       if(status == "Single"){
        stateTax = taxCalc(olddcStateBracketSingle,income)
      }else{
        stateTax = taxCalc(olddcStateBracketJoint,income)
      }
    }     
  } 
else if(year =="2020"){
   if(state =="Ala."){
       if(status =="Single"){
        stateTax = taxCalc(newalaStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newalaStateBracketJoint,income)
      }
    }
    else if(state =="Alaska"){
    
        stateTax = taxCalc(alaskaStateBracket,income)
    }
    else if(state =="Ariz."){
       if(status =="Single"){
        stateTax = taxCalc(newarizStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newarizStateBracketJoint,income)
      }
    }
    else if(state =="Ark."){
       if(status =="Single"){
        stateTax = taxCalc(newarkStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newarkStateBracketJoint,income)
      }
    }
    else if(state =="Calif."){
       if(status =="Single"){
        stateTax = taxCalc(newcaliStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newcaliStateBracketJoint,income)
      }
    }
    else if(state =="Colo."){
      
        stateTax = taxCalc(coloStateBracket,income)
    
    }
    else if(state == "Conn."){
       if(status == "Single"){
        stateTax = taxCalc(newconnStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newconnStateBracketJoint,income)
      }
    }
    else if(state == "Del."){
       if(status == "Single"){
        stateTax = taxCalc(newdelStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newdelStateBracketJoint,income)
      }
    }
    else if(state == "Fla."){
        stateTax = taxCalc(flaStateBracket,income)
    }
     else if(state == "Ga."){
       if(status == "Single"){
        stateTax = taxCalc(newgaStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newgaStateBracketJoint,income)
      }
    }
    else if(state == "Hawaii"){
       if(status == "Single"){
        stateTax = taxCalc(newhawaiiStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newhawaiiStateBracketJoint,income)
      }
    }
    else if(state == "Idaho"){
       if(status == "Single"){
        stateTax = taxCalc(newidahoStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newidahoStateBracketJoint,income)
      }
    }
    else if(state == "Ill."){
      
        stateTax = taxCalc(illStateBracket,income)
      
    }
    else if(state == "Ind."){
    
        stateTax = taxCalc(indStateBracket,income)
    
    }
    else if(state == "Iowa"){
       if(status == "Single"){
        stateTax = taxCalc(newiowaStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newiowaStateBracketJoint,income)
      }
    }
    else if(state == "Kans."){
       if(status == "Single"){
        stateTax = taxCalc(newkansStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newkansStateBracketJoint,income)
      }
    }
    else if(state == "Ky."){
   
        stateTax = taxCalc(kyStateBracket,income)
  
    }
    else if(state == "Maine"){
       if(status == "Single"){
        stateTax = taxCalc(newmaineStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newmaineStateBracketJoint,income)
      }
    }
     else if(state == "Md."){
       if(status == "Single"){
        stateTax = taxCalc(newmdStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newmdStateBracketJoint,income)
      }
    }
    else if(state == "Mass."){
  
        stateTax = taxCalc(massStateBracket,income)
      
    }
    else if(state == "Mich."){
       
        stateTax = taxCalc(michStateBracket,income)
    }
    else if(state == "Minn."){
       if(status == "Single"){
        stateTax = taxCalc(newminnStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newminnStateBracketJoint,income)
      }
    }
    else if(state == "Miss."){
       if(status == "Single"){
        stateTax = taxCalc(newmissStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newmissStateBracketJoint,income)
      }
    }
    else if(state == "Mo."){
       if(status == "Single"){
        stateTax = taxCalc(newmoStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newmoStateBracketJoint,income)
      }
    }
    else if(state == "Mont."){
       if(status == "Single"){
        stateTax = taxCalc(newmontStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newmontStateBracketJoint,income)
      }
    }
    else if(state == "Nebr."){
       if(status == "Single"){
        stateTax = taxCalc(newnebrStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newnebrStateBracketJoint,income)
      }
    }
    else if(state == "Nev."){
       
        stateTax = taxCalc(nev)

    }
     else if(state == "N.H."){
     
        stateTax = taxCalc(nhStateBracket,income)
     
    }
    else if(state == "N.J."){
       if(status == "Single"){
        stateTax = taxCalc(newnjStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newnjStateBracketJoint,income)
      }
    }
    else if(state == "N.M."){
       if(status == "Single"){
        stateTax = taxCalc(newnmStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newnmStateBracketJoint,income)
      }
    }
    else if(state == "N.Y."){
       if(status == "Single"){
        stateTax = taxCalc(newnyStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newnyStateBracketJoint,income)
      }
    }
    else if(state == "N.C."){
    
        stateTax = taxCalc(ncStateBracket,income)
    }
    else if(state == "N.D."){
       if(status == "Single"){
        stateTax = taxCalc(newndStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newndStateBracketJoint,income)
      }
    }
    else if(state == "Ohio"){
       if(status == "Single"){
        stateTax = taxCalc(newohioStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newohioStateBracketJoint,income)
      }
    }
    else if(state == "Okla."){
       if(status == "Single"){
        stateTax = taxCalc(newoklaStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newoklaStateBracketJoint,income)
      }
    }
    else if(state == "Ore."){
       if(status == "Single"){
        stateTax = taxCalc(neworeStateBracketSingle,income)
      }else{
        stateTax = taxCalc(neworeStateBracketJoint,income)
      }
    }
     else if(state == "Pa."){

        stateTax = taxCalc(paStateBracket,income)
     
    }
    else if(state == "R.I."){
       if(status == "Single"){
        stateTax = taxCalc(newriStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newriStateBracketJoint,income)
      }
    }
    else if(state == "S.C."){
       if(status == "Single"){
        stateTax = taxCalc(newscStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newscStateBracketJoint,income)
      }
    }
    else if(state == "S.D."){
   
        stateTax = taxCalc(sdStateBracket,income)
     
    }
    else if(state == "Tenn."){
   
        stateTax = taxCalc(tennStateBracket,income)
     
    }
    else if(state == "Tex."){
       
        stateTax = taxCalc(texStateBracket,income)
      
    }
    else if(state == "Utah"){
  
        stateTax = taxCalc(utahStateBracket,income)
    
    }
    else if(state == "Vt."){
       if(status == "Single"){
        stateTax = taxCalc(newvtStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newvtStateBracketJoint,income)
      }
    }
    else if(state == "Va."){
       if(status="Single"){
        stateTax = taxCalc(newvaStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newvaStateBracketJoint,income)
      }
    }
    else if(state =="Wash."){
        stateTax = taxCalc(washStateBracket,income)
    }
    else if(state =="W.Va."){
       if(status="Single"){
        stateTax = taxCalc(newwvaStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newwvaStateBracketJoint,income)
      }
    }
    else if(state == "Wis."){
       if(status == "Single"){
        stateTax = taxCalc(newwisStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newwisStateBracketJoint,income)
      }
    }
    else if(state == "Wyo."){
     
        stateTax = taxCalc(wyoStateBracket,income)
      
    }
    else if(state =="D.C."){
       if(status == "Single"){
        stateTax = taxCalc(newdcStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newdcStateBracketJoint,income)
      }

    }     
  }
  return stateTax;
 
}

function ficaController(income){
   let ficaBracket = {one: [0,132900, .124], two: [0,200000, .029], three: [200001, Infinity, .038] }
  if(income < 400){
    return 0;
  }
  else{
   return taxCalc(ficaBracket, income)
  }
}

function fedTaxController(year, status, income){
  let fedTax = 0;
   let oldfedBracketSingle = {ten:[0,9700,.10], twelve: [9701, 39475, .12], twentytwo: [39476, 84200, .22],twentyfour: [84201,160725, .24], thirtytwo: [160726,204100, .32], thirtyfive: [204101,510300, .35], thirtyseven: [510300, Infinity , .37] }
  let oldfedBracketJointWed = {ten:[0,19400,.10], twelve: [19401, 78950, .12], twentytwo: [78951, 168400, .22], twentyfour: [168401,321450,.24], thirtytwo: [321451,408200, .32], thirtyfive: [408201,612350, .35], thirtyseven: [612351, Infinity , .37] }
  let oldfedBracketSepWed = {ten:[0,9700,.10], twelve: [9701, 39475, .12], twentytwo: [39476, 84200, .22],twentyfour: [84201,160725, .24], thirtytwo: [160726,204100, .32], thirtyfive: [204101,510300, .35], thirtyseven: [510300, Infinity , .37] }
  let oldfedBracketHead = {ten:[0,13850,.10], twelve: [13851, 52850, .12], twentytwo: [52851, 84200, .22],twentyfour: [84201,160700, .24], thirtytwo: [160701, 204100, .32], thirtyfive: [204101,306750, .35], thirtyseven: [306751, Infinity , .37] }

  let newfedBracketSingle = {ten:[0,9875,.10], twelve: [9876, 40125, .12], twentytwo: [40126, 85525, .22],twentyfour: [85526,163300, .24], thirtytwo: [163301,207350, .32], thirtyfive: [207351,518400, .35], thirtyseven: [518400, Infinity , .37] }
  let newfedBracketJointWed  = {ten:[0,19750,.10], twelve: [19751, 80250, .12], twentytwo: [80251, 171050, .22],twentyfour: [171051,326600, .24], thirtytwo: [326601,414700, .32], thirtyfive: [414701,622050, .35], thirtyseven: [622051, Infinity , .37] }
  let newfedBracketSepWed = {ten:[0,9875,.10], twelve: [9876, 40125, .12], twentytwo: [40126, 85525, .22],twentyfour: [85526,163300, .24], thirtytwo: [163301,207350, .32], thirtyfive: [207351,311025, .35], thirtyseven: [311026, Infinity , .37] }
  let newfedBracketHead = {ten:[0,14100,.10], twelve: [14101, 53700, .12], twentytwo: [53701, 85500, .22],twentyfour: [85501,163300, .24], thirtytwo: [163301,207350, .32], thirtyfive: [207351,518400, .35], thirtyseven: [518400, Infinity , .37] }
  if(year == "2019"){
    if(status == "Single"){
      fedTax = taxCalc(oldfedBracketSingle, income);
    }
    else if(status == "Married Filing Jointly"){
      fedTax = taxCalc(oldfedBracketJointWed, income);

    }
    else if(status == "Married Filing Seperately"){
      fedTax = taxCalc(oldfedBracketSepWed, income);
    }
    else if(status == "Head of Household"){
      fedTax = taxCalc(oldfedBracketHead, income);
    }
  }
  else if(year == "2020"){
     if(status == "Single"){
      fedTax = taxCalc(newfedBracketSingle, income);
    }
    else if(status == "Married Filing Jointly"){
      fedTax = taxCalc(newfedBracketJointWed, income);

    }
    else if(status == "Married Filing Seperately"){
      fedTax = taxCalc(newfedBracketSepWed, income);
    }
    else if(status == "Head of Household"){
      fedTax = taxCalc(newfedBracketHead, income);
    }
  }
  return fedTax;
}

function stndDeductionController(status, year){
  let deduction = 0;
  if(year == "2019"){
    if(status == "Single"){
      deduction = 12200;
    }
    else if(status == "Married Filing Jointly"){
      deduction = 24400;
    }
    else if(status == "Married Filing Seperately"){
      deduction = 12200;
    }
    else if(status == "Head of Household"){
      deduction = 18350;
    }
  }
  else if(year == "2020"){
     if(status == "Single"){
      deduction = 12400;
    }
    else if(status == "Married Filing Jointly"){
      deduction = 24400;

    }
    else if(status == "Married Filing Seperately"){
      deduction = 24800;
    }
    else if(status == "Head of Household"){
      deduction = 18650;
    }
  }

  return deduction;
}

function totalTaxCalc(state, year, status, income){
  let totalTax = 0;
  let totalFed = 0;
  let agi = 0;
  let stndDeduction = stndDeductionController(status, year)
  
  if (income > stndDeduction){
      // self employment deduction
      agi = income  - (ficaController(income)/ 2);
       showWork.totalFica =   roundPenny(ficaController(income));
      showWork.agi = roundPenny(agi);
      totalFed = fedTaxController(year, status, agi);
       console.log("if" + totalFed)
      showWork.totalFed = roundPenny(totalFed); 
      totalTax = totalFed + stateTaxController(year, state, status, income);
      showWork.totalState = roundPenny(stateTaxController(year, state,status, income)); 
    //medicare + aid tax
      totalTax = totalTax + ficaController(income);
  }else{   
    
    totalTax =  stateTaxController(year, state, status, income); 
  
    //medicare + aid tax
    totalTax = totalTax + ficaController(income);
      showWork.totalFed = 0;
      showWork.totalFica =   roundPenny(ficaController(income));
     showWork.totalState = roundPenny(stateTaxController(year, state,status, income)); 
  }

 return roundPenny(totalTax);
}

function divider(top, bottom){
  let total = 0;
  if(top == "0" || top == 0){
    total = 0;
  }
  else{
    total = top/ bottom;
  }
  return total;
}

function taxPercent(totalTax, income){
  return Math.round((divider(totalTax, income)) * 100);
}


//old is old tax season new is new tax season
//RUNNER
//fed, fica, deduction, state, year, status, income
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})
var $taxButton = document.getElementById("tax-button");
var $results = document.getElementById("results");
var $incomeInput = document.getElementById("income-input");
var $stateSelect = document.getElementById("state-select");
var $statusSelect = document.getElementById("status-select");
var $toggle = document.getElementsByClassName("toggle_bar")[0];
var $chart = document.getElementsByClassName("donut-chart")[0];
var $year = document.getElementsByClassName("toggle_square")[0];
var $math = document.getElementsByClassName("math")[0];

  var year = "2020";
$toggle.onclick = function(){
  if ($year.offsetLeft == "0"){
    year = "2020";
 } 
  else if($year.offsetLeft == "40"){
    year = "2019";
  }
  console.log(year)
}
  
if (typeof Object.create !== 'function') {
  Object.create = function(obj) {
    function F() {}
    F.prototype = obj;
    return new F();
  };
}


// Select containers
var chartContainer1 = document.querySelector('[data-donut-chart="1"]');


// Data
var chartData1a = {
  total: 0
  
};

// Create new chart objects
var Chart1 = Object.create(DonutChart);
var Chart2 = Object.create(DonutChart);

Chart1.init({
  container: chartContainer1,
  data: chartData1a
});
$taxButton.onclick = function(e){
   $incomeInput.blur();
  let income = Number(reformatNumber($incomeInput.value));
  let state = $stateSelect.value;
  let status = $statusSelect.value;
  
  let myTax = totalTaxCalc(state, year, status, income) 
  let myTaxPercent = taxPercent(myTax, income)
  chartData1a.total= formatter.format(myTax);
  Chart1.update({
  data: chartData1a
  });
  
  $math.innerHTML = `
  <p>Federal Tax: ${formatter.format(showWork.totalFed)} </p>
  <p>State Tax: ${formatter.format(showWork.totalState)} </p>
  <p>Self-Employment Tax: ${formatter.format(showWork.totalFica)} </p>
 <p>Estimated Tax: ${formatter.format(divider(myTax, 4))} per quarter </p>
<p>Tax Percent: ${myTaxPercent}% </p>
`
  console.log(myTax)
  console.log(myTaxPercent)
// $results.innerHTML= myTax + "";
  $chart.scrollIntoView()
  
}
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

var $iosStateSelect  = document.getElementById("state-select");
var $iosStatusSelect  = document.getElementById("status-select");
if (iOS){
  console.log("I'm in.")
  $iosStateSelect.touchend = function(){
    $incomeInput.blur();
    $iosStateSelect.focus();
  }
   $iosStatusSelect.touchend = function(){
    $incomeInput.blur();
     $iosStatusSelect.focus();
  }
  
  
}
})
/**
  * Donut Chart
  * --------------------------------------------------
  */




/**
  * Demo
  * --------------------------------------------------
  */

// Object.create() polyfill



