
 $( '*' ).click( function ( ) { } );
$( 'html' ).css( "-webkit-tap-highlight-color", "rgba(0, 0, 0, 0)" );


window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};




 if(window.mobileCheck() == true){
  $("input[data-type='currency']").on({
     input: function() {
       document.body.firstElementChild.tabIndex = 1;

      formatCurrency($(this));
    },
    touchend: function(e){
      document.body.firstElementChild.tabIndex = 1;

      e.target.blur();
    }
});

}else{
  $("input[data-type='currency']").on({
    keyup: function() {
      document.body.firstElementChild.tabIndex = 1;

      formatCurrency($(this));
    },
     blur: function() { 
      document.body.firstElementChild.tabIndex = 1;
      formatCurrency($(this), "blur");
    },
    touchend: function(e){
      document.body.firstElementChild.tabIndex = 1;

     $(this).blur();
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
function fedTaxCalc(fedBracket, income, deduction){
  return taxCalc(fedBracket, income - deduction);
}

function stateTaxCalc(stateBracket, income, deduction){
  return taxCalc(stateBracket, income - deduction);
}

function ficaCalc(ficaBracket, income){
  return taxCalc(ficaBracket, income);
}

var showWork = {
  agi: 0,
  totalFed: 0,
  totalState: 0,
  totalFica: 0,
  remainder: 0
  }

function stateTaxController(year,state,status,income){
  let stateTax = 0;
// old is actually 2021
  let newalaStateBracketSingle = {one:[0,500,.02], two: [501, 3000, .04], three: [3001, Infinity, .05] }
  let newalaStateBracketJoint = {one:[0,1000,.02], two: [1001, 6000, .04], three: [6001, Infinity, .05] }
  
  let oldalaStateBracketSingle = {one:[0,500,.02], two: [501, 3000, .04], three: [3001, Infinity, .05] }
  let oldalaStateBracketJoint = {one:[0,1000,.02], two: [1001, 6000, .04], three: [6001, Infinity, .05] }

  let alaskaStateBracket = {one:[0,0,0]}

   let newarizStateBracketSingle = {one:[0,27808,.0259], two: [27809, 55615, .0334], three: [55616, 166843, .0417], four: [166844, Infinity, .045]}
  let newarizStateBracketJoint = {one:[0,55615,.0259], two: [55616, 111229, .0334], three: [111230, 333684, .0417], four: [333685, Infinity, .045]}
  let oldarizStateBracketSingle = {one:[0,27272,.0259], two: [27273, 54544, .0334], three: [54545, 163632, .0417], four: [163633, 250000, .045], five: [250001, Infinity, .08]}
  let oldarizStateBracketJoint = {one:[0,54544,.0259], two: [54545, 109088, .0334], three: [109089, 327263, .0417], four: [327264, 500000, .045], five: [500001, Infinity, .08]}

  let newarkStateBracketSingle = {one:[0,4300,.02], two: [4301, 8500, .04], three: [8501, Infinity , .055]}
  let newarkStateBracketJoint = {one:[0,4300,.02], two: [4301, 8500, .04], three: [8501, Infinity , .055]}
  let oldarkStateBracketSingle = {one:[0,4000,.02], two: [4001, 8000, .04], three: [8001, Infinity , .059]}
  let oldarkStateBracketJoint = {one:[0,4000,.02], two: [4001, 8000, .04], three: [8001, Infinity , .059]}

  let newcaliStateBracketSingle = {one:[0,9325,.01], two: [9326,22107, .02], three: [22108,34892, .04],four: [34893,48435,.06], five: [48436,61214, .08], six: [61215,312686, .0930], seven: [312687,375221, .1030], eight: [375222, 625369, .1130], nine: [625370, 1000000, .1230], ten: [1000001, Infinity, .1330] }
  let newcaliStateBracketJoint = {one:[0,18650,.01], two: [18651, 44214, .02], three: [44215,69784, .04],four: [69785,96870, .06], five: [96871,122428, .08], six: [122429,625372, .0930], seven: [625373, 750442, .1030], eight: [750443, 1000000, .1130], nine: [1000001, 1250738, .1230], ten: [1250739, Infinity, .1330] }
  let oldcaliStateBracketSingle = {one:[0,8932,.01], two: [8933,21175, .02], three: [21176,33421, .04],four: [33422,46395,.06], five: [46396,58634, .08], six: [58635,299508, .0930], seven: [299509,359407 , .1030], eight: [35408, 599012, .1130], nine: [599013, 1000000, .1230], ten: [1000001, Infinity, .1330] }
  let oldcaliStateBracketJoint = {one:[0,17864,.01], two: [17865, 42350, .02], three: [42351,66842, .04],four: [66843,92788, .06], five: [92789,117268, .08], six: [117269,599016, .0930], seven: [599017, 718814, .1030], eight: [718814, 1000000, .1130], nine: [1000001, 1198024, .1230], ten: [1198025, Infinity, .1330] }


  let coloStateBracket = {one:[0,Infinity,.0455] }

  let newconnStateBracketSingle = {one:[0,10000,.03], two: [10001, 50000, .05], three: [50001, 100000, .055], four: [100001, 200000 , .06], five: [200001, 250000, .065], six: [250001, 500000, .069], seven: [500001, Infinity, .0699] }
  let newconnStateBracketJoint = {one:[0,20000,.03], two: [20001, 100000, .05], three: [100001, 200000, .055], four: [200001, 400000 , .06], five: [400001, 500000, .065], six: [500001, 1000000, .069], seven: [1000001, Infinity, .0699] }
  let oldconnStateBracketSingle = {one:[0,10000,.03], two: [10001, 50000, .05], three: [50001, 100000, .055], four: [100001, 200000 , .06], five: [200001, 250000, .065], six: [250001, 500000, .069], seven: [500001, Infinity, .0699] }
  let oldconnStateBracketJoint = {one:[0,20000,.03], two: [20001, 100000, .05], three: [100001, 200000, .055], four: [200001, 400000 , .06], five: [400001, 500000, .065], six: [500001, 1000000, .069], seven: [1000001, Infinity, .0699] }

  let newdelStateBracketSingle = {one: [2000, 5000, .022], three: [5001, 10000, .039], four: [10001, 20000 , .048], five: [20001, 25000, .052], six: [25001, 60000, .0555], seven: [60001, Infinity, .066] }
  let newdelStateBracketJoint = {one: [2000, 5000, .022], three: [5001, 10000, .039], four: [10001, 20000 , .048], five: [20001, 25000, .052], six: [25001, 60000, .0555], seven: [60001, Infinity, .066]  }
  let olddelStateBracketSingle = {one: [2000, 5000, .022], three: [5001, 10000, .039], four: [10001, 20000 , .048], five: [20001, 25000, .052], six: [25001, 60000, .0555], seven: [60001, Infinity, .0699] }
  let olddelStateBracketJoint = {one: [2000, 5000, .022], three: [5001, 10000, .039], four: [10001, 20000 , .048], five: [20001, 25000, .052], six: [25001, 60000, .0555], seven: [60001, Infinity, .0699] }


  let flaStateBracket = {one: [0,0,0]}

  let newgaStateBracketSingle = {one: [0, 750, .01], three: [751, 2250, .02], four: [2251, 3750 , .03], five: [3751, 5250, .04], six: [5251, 7000, .05], seven: [7001, Infinity, .0575] }
  let newgaStateBracketJoint = {one: [0, 1000, .01], three: [1001, 3000, .02], four: [3001, 5000 , .03], five: [5001, 7000, .04], six: [7001, 10000, .05], seven: [10001, Infinity, .0575] }
  let oldgaStateBracketSingle = {one: [0, 750, .01], three: [751, 2250, .02], four: [2251, 3750 , .03], five: [3751, 5250, .04], six: [5251, 7000, .05], seven: [7001, Infinity, .0575] }
  let oldgaStateBracketJoint = {one: [0, 1000, .01], three: [1001, 3000, .02], four: [3001, 5000 , .03], five: [5001, 7000, .04], six: [7001, 10000, .05], seven: [10001, Infinity, .0575] }

  let newhawaiiStateBracketSingle = {one:[0,2400,.014], two: [2401, 4800, .032], three: [4801, 9600, .055],four: [9601,14400, .064], five: [14401,19200, .068], six: [19201,24000, .072], seven: [24001, 36000 , .076], eight: [36001, 48000, .079], nine: [48001, 150000, .0825], ten: [150001, 175000, .09], eleven: [175001, 200000, .10], twelve: [200000, Infinity, .11] }
  let newhawaiiStateBracketJoint = {one:[0,4800,.014], two: [4801, 9600, .032], three: [9601, 19200, .055],four: [19201,28800, .064], five: [28801,38400, .068], six: [38401,48000, .072], seven: [48001, 72000 , .076], eight: [72001, 96000, .079], nine: [96001, 300000, .0825], ten: [300001, 350000, .09], eleven: [350001, 400000, .10], twelve: [400000, Infinity, .11]}
  let oldhawaiiStateBracketSingle = {one:[0,2400,.014], two: [2401, 4800, .032], three: [4801, 9600, .055],four: [9601,14400, .064], five: [14401,19200, .068], six: [19201,24000, .072], seven: [24001, 36000 , .076], eight: [36001, 48000, .079], nine: [48001, 150000, .0825], ten: [150001, 175000, .09], eleven: [175001, 200000, .10], twelve: [200000, Infinity, .11] }
  let oldhawaiiStateBracketJoint = {one:[0,4800,.014], two: [4801, 9600, .032], three: [9601, 19200, .055],four: [19201,28800, .064], five: [28801,38400, .068], six: [38401,48000, .072], seven: [48001, 72000 , .076], eight: [72001, 96000, .079], nine: [96001, 300000, .0825], ten: [300001, 350000, .09], eleven: [350001, 400000, .10], twelve: [400000, Infinity, .11] }

  let newidahoStateBracketSingle = {one: [0, 1588, .01], two: [1589,4763, .03], three: [4764, 7939, .045], four: [7940, Infinity, .06]}
  let newidahoStateBracketJoint = {one: [0, 3176, .01], three: [3177, 9526, .03], four: [9527, 15878, .045], five: [15879, Infinity, .06]}
  let oldidahoStateBracketSingle = {one: [0, 1568, .01125], two: [1569,3136, .03125], three: [3137, 4704 , .03625], four: [4705, 6272, .04625], five: [6273, 7840, .05625], six: [7841, 11760, .06625], seven: [11761, Infinity, .06925] }
  let oldidahoStateBracketJoint = {one: [0, 3136, .01125], three: [3137, 6272, .03125], four: [6273, 9408 , .03625], five: [9409, 12544, .04625], six: [12545, 15680, .05625], seven: [15681, 23520, .06625], eight: [23521, Infinity, .06925] }


  let illStateBracket = {one: [0, Infinity, .0495]}
  let indStateBracket = {one: [0, Infinity, .0323]}

  let newiowaStateBracketSingle = {one: [0, 1743, .0033], three: [1744, 3486, .0067], four: [3487, 6972, .0225], five: [6973, 15687, .0414], six: [15688, 26145, .0563], seven: [26146, 34860, .0596], eight: [34861, 52290, .0625], nine: [52291, 78435, .0744], ten: [78436, Infinity, .0853] }
  let newiowaStateBracketJoint = {one: [0, 1743, .0033], three: [1744, 3486, .0067], four: [3487, 6972, .0225], five: [6973, 15687, .0414], six: [15688, 26145, .0563], seven: [26146, 34860, .0596], eight: [34861, 52290, .0625], nine: [52291, 78435, .0744], ten: [78436, Infinity, .0853] }
  let oldiowaStateBracketSingle = {one: [0, 1676, .0033], three: [1677, 3352, .0067], four: [3353, 6704 , .0225], five: [6705, 15084, .0414], six: [15085, 25140, .0562], seven: [25141, 33520, .0596], eight: [33521, 50280, .0625], nine: [50281, 75420, .0744], ten: [75421, Infinity, .0853] }
  let oldiowaStateBracketJoint = {one: [0, 1676, .0033], three: [1677, 3352, .0067], four: [3353, 6704 , .0225], five: [6705, 15084, .0414], six: [15085, 25140, .0562], seven: [25141, 33520, .0596], eight: [33521, 50280, .0625], nine: [50281, 75420, .0744], ten: [75421, Infinity, .0853] }


  let newkansStateBracketSingle = {one: [0, 15000, .031], three: [15001, 30000, .0525], four: [30001, Infinity , .057] }
  let newkansStateBracketJoint = {one: [0, 30000, .031], three: [30001, 60000, .0525], four: [60001, Infinity , .057] }
  let oldkansStateBracketSingle = {one: [0, 15000, .031], three: [15001, 30000, .0525], four: [30001, Infinity , .057] }
  let oldkansStateBracketJoint = {one: [0, 30000, .031], three: [30001, 60000, .0525], four: [60001, Infinity , .057] }

  let kyStateBracket = {one: [0, Infinity, .05]}

  let newlaStateBracketSingle = {one: [0, 12500, .0185], three: [12501, 50000, .035], four: [50001, Infinity , .0425] }
  let newlaStateBracketJoint = {one: [0, 25000, .0185], three: [25001, 100000, .035], four: [100001, Infinity , .0425] }
  let oldlaStateBracketSingle = {one: [0, 12500, .02], three: [12501, 50000, .04], four: [50001, Infinity , .06] }
  let oldlaStateBracketJoint = {one: [0, 25000, .02], three: [25001, 100000, .04], four: [100001, Infinity , .06] }

  let newmaineStateBracketSingle = {one: [0, 23000, .058], three: [23001, 54450, .0675], four: [54450, Infinity , .0715] }
  let newmaineStateBracketJoint = {one: [0, 46000, .058], three: [46001, 108900, .0675], four: [108901, Infinity , .0715] }
  let oldmaineStateBracketSingle = {one: [0, 22450, .058], three: [22451, 53150, .0675], four: [53151, Infinity , .0715] }
  let oldmaineStateBracketJoint = {one: [0, 44950, .058], three: [44951, 106350, .0675], four: [106351, Infinity , .0715] }

  let newmdStateBracketSingle = {one: [0, 1000, .02], three: [1001, 2000, .03], four: [2001, 3000 , .04], five: [3001, 100000, .0475], six: [100001, 125000, .05], seven: [125001, 150000, .0525], eight: [150001, 250000, .055], nine: [250001, Infinity, .0575] }
  let newmdStateBracketJoint = {one: [0, 1000, .02], three: [1001, 2000, .03], four: [2001, 3000 , .04], five: [3001, 150000, .0475], six: [150001, 175000, .05], seven: [175001, 225000, .0525], eight: [225001, 300000, .055], nine: [300001, Infinity, .0575] }
  let oldmdStateBracketSingle = {one: [0, 1000, .02], three: [1001, 2000, .03], four: [2001, 3000 , .04], five: [3001, 100000, .0475], six: [100001, 125000, .05], seven: [125001, 150000, .0525], eight: [150001, 250000, .055], nine: [250001, Infinity, .0575] }
  let oldmdStateBracketJoint = {one: [0, 1000, .02], three: [1001, 2000, .03], four: [2001, 3000 , .04], five: [3001, 150000, .0475], six: [150001, 175000, .05], seven: [175001, 225000, .0525], eight: [225001, 300000, .055], nine: [300001, Infinity, .0575] }

  let massStateBracket = {one: [0, Infinity, .05]}
  let michStateBracket = {one: [0, Infinity, .0425]}

  let newminnStateBracketSingle = {one: [0, 28080, .0535], three: [28081, 92230, .068], four: [92231, 171220, .0785], five: [171221, Infinity, .0985] }
  let newminnStateBracketJoint = {one: [0, 41050, .0535], three: [41051, 163060, .068], four: [163061, 284810, .0785], five: [284811, Infinity, .0985] }
  let oldminnStateBracketSingle = {one: [0, 27230, .0535], three: [27231, 89440, .0705], four: [89441, 166040, .0785], five: [166041, Infinity, .0985] }
  let oldminnStateBracketJoint = {one: [0, 39810, .0535], three: [39811, 158140, .0705], four: [158141, 276200, .0785], five: [276201, Infinity, .0985] }

  let newmissStateBracketSingle = {one: [5000, 10000, .04], three: [10001, Infinity, .05]}
  let newmissStateBracketJoint = {one: [5000, 10000, .04], three: [10001, Infinity, .05]}
  let oldmissStateBracketSingle = {one: [4000, 5000, .03], three: [5001, 10000, .04], four: [10001, Infinity , .05] }
  let oldmissStateBracketJoint = {one: [4000, 5000, .03], three: [5001, 10000, .04], four: [10001, Infinity , .05] }

  let newmoStateBracketSingle = {one: [108, 1088, .015], three: [1089, 2176, .02], four: [2177, 3264, .025], five: [3265, 4352, .03], six: [4353, 5440, .035], seven: [5441, 6528, .04], eight: [6529, 7616, .045], nine: [7617, 8704, .05], ten: [8705, Infinity, .054] }
  let newmoStateBracketJoint = {one: [108, 1088, .015], three: [1089, 2176, .02], four: [2177, 3264, .025], five: [3265, 4352, .03], six: [4353, 5440, .035], seven: [5441, 6528, .04], eight: [6529, 7616, .045], nine: [7617, 8704, .05], ten: [8705, Infinity, .054] }
  let oldmoStateBracketSingle = {one: [107, 1073, .015], three: [1074, 2146, .02], four: [2147, 3219 , .025], five: [3220, 4292, .03], six: [4293, 5365, .035], seven: [5366, 6438, .04], eight: [6439, 7511, .045], nine: [7512, 8584, .05], ten: [8585, Infinity, .054] }
  let oldmoStateBracketJoint = {one: [107, 1073, .015], three: [1074, 2146, .02], four: [2147, 3219 , .025], five: [3220, 4292, .03], six: [4293, 5365, .035], seven: [5366, 6438, .04], eight: [6439, 7511, .045], nine: [7512, 8584, .05], ten: [8585, Infinity, .054] }

  let newmontStateBracketSingle = {one: [0, 3100, .01], three: [3101, 5500, .02], four: [5501, 8400 , .03], five: [8401, 11400, .04], six: [11401, 14600, .05], seven: [14601, 18800, .06], eight: [18801, Infinity, .0675]}
  let newmontStateBracketJoint = {one: [0, 3100, .01], three: [3101, 5500, .02], four: [5501, 8400 , .03], five: [8401, 11400, .04], six: [11401, 14600, .05], seven: [14601, 18800, .06], eight: [18801, Infinity, .0675]}
  let oldmontStateBracketSingle = {one: [0, 3100, .01], three: [3101, 5500, .02], four: [5501, 8400 , .03], five: [8401, 11300, .04], six: [11301, 14500, .05], seven: [14501, 18700, .06], eight: [18701, Infinity, .069] }
  let oldmontStateBracketJoint = {one: [0, 3100, .01], three: [3101, 5500, .02], four: [5501, 8400 , .03], five: [8401, 11300, .04], six: [11301, 14500, .05], seven: [14501, 18700, .06], eight: [18701, Infinity, .069] }

  let newnebrStateBracketSingle = {one: [0, 3340, .0246], three: [3341, 20590, .0351], four: [20591, 33180, .0501], five: [33181, Infinity, .0684] }
  let newnebrStateBracketJoint = {one: [0, 6860, .0246], three: [6861, 41190, .0351], four: [41191, 66360, .0501], five: [66361, Infinity, .0684] }
  let oldnebrStateBracketSingle = {one: [0, 3340, .0246], three: [3341, 19990, .0351], four: [19991, 32210, .0501], five: [32211, Infinity, .0684] }
  let oldnebrStateBracketJoint = {one: [0, 6660, .0246], three: [6661, 39990, .0351], four: [39991, 64430, .0501], five: [64431, Infinity, .0684] }

  let nevStateBracket = {one: [0,0,0]}
  let nhStateBracket = {one: [0, 0, 0]}

  let newnjStateBracketSingle = {one: [0, 20000, .014], three: [20001, 35000, .0175], four: [35001, 40000 , .035], five: [40001, 75000, .05525], six: [75001, 500000, .0637], seven: [500001, 1000000, .0897], eight: [1000001, Infinity, .1075] }
  let newnjStateBracketJoint = {one: [0, 20000, .014], three: [20001, 50000, .0175], four: [50001, 70000, .0245], five: [70001, 80000, .035], six: [80001, 150000, .05525], seven: [150001, 500000, .0637], eight: [500001, 1000000, .0897], nine: [1000001, Infinity, .1075] }
  let oldnjStateBracketSingle = {one: [0, 20000, .014], three: [20001, 35000, .0175], four: [35001, 40000 , .035], five: [40001, 75000, .05525], six: [75001, 500000, .0637], seven: [500001, 1000000, .0897], eight: [1000001, Infinity, .1075] }
  let oldnjStateBracketJoint = {one: [0, 20000, .014], three: [20001, 50000, .0175], four: [50001, 70000 , .0245], five: [70001, 80000, .035], six: [80001, 150000, .05525], seven: [150001, 500000, .0637], eight: [500001, 1000000, .0897], nine: [1000001, Infinity, .1075] }

  let newnmStateBracketSingle = {one: [0, 5500, .017], three: [5501, 11000, .032], four: [11001, 16000, .047], five: [16001, 210000, .049], six: [210001, Infinity, .059] }
  let newnmStateBracketJoint = {one: [0, 8000, .017], three: [8001, 16000, .032], four: [16001, 24000, .047], five: [24001, 315001, .049], six: [315001, Infinity, .059] }
  let oldnmStateBracketSingle = {one: [0, 5500, .017], three: [5501, 11000, .032], four: [11001, 16000, .047], five: [16001, Infinity, .049] }
  let oldnmStateBracketJoint = {one: [0, 8000, .017], three: [8001, 16000, .032], four: [16001, 24000, .047], five: [24001, Infinity, .049] }

  let newnyStateBracketSingle = {one:[0,8500,.04], two: [8501, 11700, .045], three: [11701, 13900, .0525],four: [13901,80650, .0585], five: [80651,215400, .0625], six: [215401,1077550, .0685], seven: [1077551, 5000000, .0965], eight: [5000001, 25000000, .1030], nine: [25000001, Infinity, .1090]}
  let newnyStateBracketJoint = {one:[0,17150,.04], two: [17151, 23600, .045], three: [23601, 27900, .0525],four: [27901,161550, .0585], five: [161551,323200, .0625], six: [323201,2155350, .0685], seven: [2155351, 5000000 , .0965], eight: [5000000, 25000000, .1030], nine: [25000001, Infinity, .1090]}
  let oldnyStateBracketSingle =  {one:[0,8500,.04], two: [8501, 11700, .045], three: [11701, 13900, .0525],four: [13901,21400, .059], five: [21401,80650, .0597], six: [80651,215400, .0633], seven: [215401, 1077550 , .0685], eight: [1077551, Infinity, .0882] }
  let oldnyStateBracketJoint = {one:[0,17150,.04], two: [17151, 23600, .045], three: [23601, 27900, .0525],four: [27901,43000, .059], five: [43001,161550, .0633], six: [161551,323200, .0657], seven: [323201, 2155350 , .0685], eight: [2155351, Infinity, .0882] }

  let ncStateBracket = {one: [0, Infinity, .0499]}

  let newndStateBracketSingle = {one: [0, 40525, .011], three: [40526, 98100, .0204], four: [98101, 204675, .0227], five: [204676, 445000, .0264], six: [445001, Infinity, .029] }
  let newndStateBracketJoint = {one: [0, 67700, .011], three: [67701, 163550, .0204], four: [163551, 249150, .0227], five: [249151, 445000, .0264], six: [445001, Infinity, .029]}
  let oldndStateBracketSingle = {one: [0, 40125, .011], three: [40126, 97150, .0204], four: [97151, 202650, .0227], five: [202651, 440600, .0264], six: [440601, Infinity, .029] }
  let oldndStateBracketJoint = {one: [0, 67050, .011], three: [67051, 161950, .0204], four: [161951, 246700, .0227], five: [246701, 440600, .0264], six: [440601, Infinity, .029]}

  let newohioStateBracketSingle = {one:[25000,44250,.02765], two: [44251, 88450, .03326], three: [88451, 110650, .03688],four: [110651,Infinity, .0399]}
  let newohioStateBracketJoint = {one:[25000,44250,.02765], two: [44251, 88450, .03326], three: [88451, 110650, .03688],four: [110651,Infinity, .0399]}
  let oldohioStateBracketSingle = {one:[22150,44250,.0285], two: [44251, 88450, .03326], three: [88451, 110650, .03082],four: [110651,221300, .04413], five: [221301,Infinity, .04797]}
  let oldohioStateBracketJoint = {one:[22150,44250,.0285], two: [44251, 88450, .03326], three: [88451, 110650, .03082],four: [110651,221300, .04413], five: [221301,Infinity, .04797]}

  let newoklaStateBracketSingle = {one:[0,1000,.0025], two: [1001, 2500, .0075], three: [2501, 3750, .0175],four: [3751,4900, .0275], five: [4901,7200, .0375], six: [7201,Infinity, .0475]}
  let newoklaStateBracketJoint = {one:[0,2000,.0025], two: [2001, 5000, .0075], three: [5001, 7500, .0175],four: [7501,9800, .0275], five: [9801,12200, .0375], six: [12201,Infinity, .0475] }
  let oldoklaStateBracketSingle = {one:[0,1000,.005], two: [1001, 2500, .01], three: [2501, 3750, .02],four: [3751,4900, .03], five: [4901,7200, .04], six: [7201,Infinity, .05] }
  let oldoklaStateBracketJoint = {one:[0,2000,.005], two: [2001, 5000, .01], three: [5001, 7500, .02],four: [7501,9800, .03], five: [9801,12200, .04], six: [12201,Infinity, .05] }

  let neworeStateBracketSingle = {one:[0,3650,.0475], two: [3651, 9200, .0675], three: [9201, 125000, .0875],four: [125001,Infinity, .099]}
  let neworeStateBracketJoint = {one:[0,7300,.0475], two: [7301, 18400, .0675], three: [18401, 250000, .0875],four: [250001,Infinity, .099]}
  let oldoreStateBracketSingle = {one:[0,3650,.05], two: [3651, 9200, .07], three: [9201, 125000, .09],four: [125001,Infinity, .099]}
  let oldoreStateBracketJoint = {one:[0,7300,.05], two: [7301, 18400, .07], three: [18401, 250000, .09],four: [250001,Infinity, .099]}

  let paStateBracket = {one: [0, Infinity, .0307]}

  let newriStateBracketSingle = {one:[0,68200,.0375], two: [68201, 155050, .0475], three: [155051, Infinity, .0599]}
  let newriStateBracketJoint = {one:[0,68200,.0375], two: [68201, 155050, .0475], three: [155051, Infinity, .0599]}
  let oldriStateBracketSingle = {one:[0,66200,.0375], two: [66201, 150550, .0475], three: [150551, Infinity, .0599]}
  let oldriStateBracketJoint = {one:[0,66200,.0375], two: [66201, 150550, .0475], three: [150551, Infinity, .0599]}

  let newscStateBracketSingle = {one:[0,3200,0], two: [3201, 6410, .03], three: [6411, 9620, .04],four: [9621,12820, .05], five: [12821,16040, .06], six: [16041,Infinity, .07] }
  let newscStateBracketJoint = {one:[0,3200,0], two: [3201, 6410, .03], three: [6411, 9620, .04],four: [9621,12820, .05], five: [12821,16040, .06], six: [16041,Infinity, .07] }
  let oldscStateBracketSingle = {one:[0,2450,.011], two: [2451, 4900, .03], three: [4901, 7350, .04],four: [7351,9800, .05], five: [9801,12250, .06], six: [12251,Infinity, .07] }
  let oldscStateBracketJoint = {one:[0,2450,.011], two: [2451, 4900, .03], three: [4901, 7350, .04],four: [7351,9800, .05], five: [9801,12250, .06], six: [12251,Infinity, .07] }

  let sdStateBracket = {one: [0, 0, 0]}
  let tennStateBracket = {one: [0, 0, 0]}
  let texStateBracket = {one: [0, 0, 0]}
  let utahStateBracket = {one: [0, Infinity, .0495]}

  let newvtStateBracketSingle = {one:[0,40950,.0335], two: [40951, 99200, .066], three: [99201, 206950, .076],four: [206951,Infinity, .0875]}
  let newvtStateBracketJoint = {one:[0,40950,.0335], two: [40951, 99200, .066], three: [99201, 206950, .076],four: [206951,Infinity, .0875]}
  let oldvtStateBracketSingle = {one:[0,40350,.0335], two: [40351, 97800, .066], three: [97801, 204000, .076],four: [204001,Infinity, .0875]}
  let oldvtStateBracketJoint = {one:[0,67450,.0335], two: [67451, 163000, .066], three: [163001, 248350, .076],four: [248351,Infinity, .0875]}

  let newvaStateBracketSingle = {one:[0,3000,.02], two: [3001, 5000, .03], three: [5001, 17000, .05],four: [17001,Infinity, .0575] }
  let newvaStateBracketJoint = {one:[0,3000,.02], two: [3001, 5000, .03], three: [5001, 17000, .05],four: [17001,Infinity, .0575] }
  let oldvaStateBracketSingle = {one:[0,3000,.02], two: [3001, 5000, .03], three: [5001, 17000, .05],four: [17001,Infinity, .0575] }
  let oldvaStateBracketJoint = {one:[0,3000,.02], two: [3001, 5000, .03], three: [5001, 17000, .05],four: [17001,Infinity, .0575] }

  let washStateBracket = {one: [0, 0, 0]}

  let newwvaStateBracketSingle = {one:[0,10000,.03], two: [10001, 25000, .04], three: [25001, 40000, .045],four: [40001,60000, .06], five: [60001,Infinity, .065] }
  let newwvaStateBracketJoint = {one:[0,10000,.03], two: [10001, 25000, .04], three: [25001, 40000, .045],four: [40001,60000, .06], five: [60001,Infinity, .065] }
  let oldwvaStateBracketSingle = {one:[0,10000,.03], two: [10001, 25000, .04], three: [25001, 40000, .045],four: [40001,60000, .06], five: [60001,Infinity, .065] }
  let oldwvaStateBracketJoint = {one:[0,10000,.03], two: [10001, 25000, .04], three: [25001, 40000, .045],four: [40001,60000, .06], five: [60001,Infinity, .065] }


  let newwisStateBracketSingle = {one:[0,12760,.0354], two: [12761, 25520, .0465], three: [25521, 280950, .0530], four: [280951, Infinity, .0765] }
  let newwisStateBracketJoint = {one:[0,17010,.0354], two: [17011, 34030, .0465], three: [34031, 374600, .0530], four: [374601, Infinity, .0765] }
  let oldwisStateBracketSingle = {one:[0,12120,.0354], two: [12121, 24250, .0465], three: [24251, 266930, .0627], four: [266931, Infinity, .0765] }
  let oldwisStateBracketJoint = {one:[0,16160,.0354], two: [16161, 32330, .0465], three: [32331, 355910, .0627], four: [355911, Infinity, .0765] }

  let wyoStateBracket = {one: [0, 0, 0]}

  let newdcStateBracketSingle = {one:[0,10000,.04], two: [10001, 40000, .06], three: [40001, 60000, .065],four: [60001,250000, .085], five: [250001,500000, .0925], six: [500001,1000000, .0975], seven: [1000001,Infinity, .1075]}
  let newdcStateBracketJoint = {one:[0,10000,.04], two: [10001, 40000, .06], three: [40001, 60000, .065],four: [60001,250000, .085], five: [250001,500000, .0925], six: [500001,1000000, .0975], seven: [1000001,Infinity, .1075]}
  let olddcStateBracketSingle = {one:[0,10000,.04], two: [10001, 40000, .06], three: [40001, 60000, .065],four: [60001,350000, .085], five: [350001,1000000, .0875], six: [1000001,Infinity, .0895] }
  let olddcStateBracketJoint = {one:[0,10000,.04], two: [10001, 40000, .06], three: [40001, 60000, .065],four: [60001,350000, .085], five: [350001,1000000, .0875], six: [1000001,Infinity, .0895] }
 // stateTax - bracket, income - deduction/exemptions
  
  
  
  if(year =="2021"){
   if(state =="Ala."){
       if(status =="Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newalaStateBracketSingle,Math.max(0, income - 2500))
      }else{
        stateTax = taxCalc(newalaStateBracketJoint,Math.max(0, income - 7500))
      }
    }
    else if(state =="Alaska"){
    
        stateTax = taxCalc(alaskaStateBracket,income)
    }
    else if(state =="Ariz."){
       if(status =="Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newarizStateBracketSingle,Math.max(0, income - 12550))
      }else{
        stateTax = taxCalc(newarizStateBracketJoint,Math.max(0, income - 25100))
      }
    }
    else if(state =="Ark."){
       if(status =="Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newarkStateBracketSingle,Math.max(0, income - 2200))
      }else{
        stateTax = taxCalc(newarkStateBracketJoint,Math.max(0, income - 4400))
      }
    }
    else if(state =="Calif."){
       if(status =="Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newcaliStateBracketSingle,Math.max(0, income - 4601))
      }else{
        stateTax = taxCalc(newcaliStateBracketJoint,Math.max(0, income - 9202))
      }
    }
    else if(state =="Colo."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(coloStateBracket,Math.max(0, income - 12550))
      }else{
        stateTax = taxCalc(coloStateBracket,Math.max(0, income - 25100))
      }
        
    
    }
    else if(state == "Conn."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newconnStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newconnStateBracketJoint,income)
      }
    }
    else if(state == "Del."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newdelStateBracketSingle,Math.max(0, income - 3250))
      }else{
        stateTax = taxCalc(newdelStateBracketJoint,Math.max(0, income - 6500))
      }
    }
    else if(state == "Fla."){
        stateTax = taxCalc(flaStateBracket,income)
    }
     else if(state == "Ga."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newgaStateBracketSingle,Math.max(0, income - 4600))
      }else{
        stateTax = taxCalc(newgaStateBracketJoint,Math.max(0, income - 6000))
      }
    }
    else if(state == "Hawaii"){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newhawaiiStateBracketSingle,Math.max(0, income - 2200))
      }else{
        stateTax = taxCalc(newhawaiiStateBracketJoint,Math.max(0, income - 4400))
      }
    }
    else if(state == "Idaho"){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newidahoStateBracketSingle,Math.max(0, income - 12550))
      }else{
        stateTax = taxCalc(newidahoStateBracketJoint,Math.max(0, income - 25100))
      }
    }
    else if(state == "Ill."){
      
        stateTax = taxCalc(illStateBracket,income)   
    }
    else if(state == "Ind."){
    
        stateTax = taxCalc(indStateBracket,income)
    
    }
    else if(state == "Iowa"){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newiowaStateBracketSingle,Math.max(0, income - 2130))
      }else{
        stateTax = taxCalc(newiowaStateBracketJoint,Math.max(0, income - 5240))
      }
    }
    else if(state == "Kans."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newkansStateBracketSingle,Math.max(0, income - 3000))
      }else{
        stateTax = taxCalc(newkansStateBracketJoint,Math.max(0, income - 7500))
      }
    }
    else if(state == "Ky."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(kyStateBracket,Math.max(0, income - 2690))
      }else{
        stateTax = taxCalc(kyStateBracket,Math.max(0, income - 5380))
      }
       
    }
    else if(state == "Maine"){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newmaineStateBracketSingle,Math.max(0, income - 12550))
      }else{
        stateTax = taxCalc(newmaineStateBracketJoint,Math.max(0, income - 25100))
      }
    }
     else if(state == "Md."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newmdStateBracketSingle,Math.max(0, income - 2300))
      }else{
        stateTax = taxCalc(newmdStateBracketJoint,Math.max(0, income - 4650))
      }
    }
    else if(state == "Mass."){
  
        stateTax = taxCalc(massStateBracket,income)
      
    }
    else if(state == "Mich."){
       
        stateTax = taxCalc(michStateBracket,income)
    }
    else if(state == "Minn."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newminnStateBracketSingle,Math.max(0, income - 12525))
      }else{
        stateTax = taxCalc(newminnStateBracketJoint,Math.max(0, income - 25050))
      }
    }
    else if(state == "Miss."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newmissStateBracketSingle,Math.max(0, income - 2300))
      }else{
        stateTax = taxCalc(newmissStateBracketJoint,Math.max(0, income - 4600))
      }
    }
    else if(state == "Mo."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newmoStateBracketSingle,Math.max(0, income - 12550))
      }else{
        stateTax = taxCalc(newmoStateBracketJoint,Math.max(0, income - 25100))
      }
    }
    else if(state == "Mont."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newmontStateBracketSingle,Math.max(0, income - 4790))
      }else{
        stateTax = taxCalc(newmontStateBracketJoint,Math.max(0, income - 9580))
      }
    }
    else if(state == "Nebr."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newnebrStateBracketSingle,Math.max(0, income - 7100))
      }else{
        stateTax = taxCalc(newnebrStateBracketJoint,Math.max(0, income - 14200))
      }
    }
    else if(state == "Nev."){
       
        stateTax = taxCalc(nevStateBracket, income)

    }
     else if(state == "N.H."){
     
        stateTax = taxCalc(nhStateBracket,income)
     
    }
    else if(state == "N.J."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newnjStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newnjStateBracketJoint,income)
      }
    }
    else if(state == "N.M."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newnmStateBracketSingle,Math.max(0, income - 12550))
      }else{
        stateTax = taxCalc(newnmStateBracketJoint,Math.max(0, income - 25100))
      }
    }
    else if(state == "N.Y."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newnyStateBracketSingle,Math.max(0, income - 8000))
      }else{
        stateTax = taxCalc(newnyStateBracketJoint,Math.max(0, income - 16050))
      }
    }
    else if(state == "N.C."){
        if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(ncStateBracket,Math.max(0, income - 10750))
      }else{
        stateTax = taxCalc(ncStateBracket,Math.max(0, income - 21500))
      }
        
    }
    else if(state == "N.D."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newndStateBracketSingle,Math.max(0, income - 12550))
      }else{
        stateTax = taxCalc(newndStateBracketJoint,Math.max(0, income - 25100))
      }
    }
    else if(state == "Ohio"){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newohioStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newohioStateBracketJoint,income)
      }
    }
    else if(state == "Okla."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newoklaStateBracketSingle,Math.max(0, income - 6350))
      }else{
        stateTax = taxCalc(newoklaStateBracketJoint,Math.max(0, income - 12700))
      }
    }
    else if(state == "Ore."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(neworeStateBracketSingle,Math.max(0, income - 2315))
      }else{
        stateTax = taxCalc(neworeStateBracketJoint,Math.max(0, income - 4630))
      }
    }
     else if(state == "Pa."){

        stateTax = taxCalc(paStateBracket,income)
     
    }
    else if(state == "R.I."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newriStateBracketSingle,Math.max(0, income - 9050))
      }else{
        stateTax = taxCalc(newriStateBracketJoint,Math.max(0, income - 18100))
      }
    }
    else if(state == "S.C."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newscStateBracketSingle,Math.max(0, income - 12550))
      }else{
        stateTax = taxCalc(newscStateBracketJoint,Math.max(0, income - 25100))
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
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newvtStateBracketSingle,Math.max(0, income - 6250))
      }else{
        stateTax = taxCalc(newvtStateBracketJoint,Math.max(0, income - 12500))
      }
    }
    else if(state == "Va."){
       if(status="Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newvaStateBracketSingle,Math.max(0, income - 4500))
      }else{
        stateTax = taxCalc(newvaStateBracketJoint,Math.max(0, income - 9000))
      }
    }
    else if(state =="Wash."){
        stateTax = taxCalc(washStateBracket,income)
    }
    else if(state =="W.Va."){
       if(status="Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newwvaStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newwvaStateBracketJoint,income)
      }
    }
    else if(state == "Wis."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newwisStateBracketSingle,Math.max(0, income - 11050))
      }else{
        stateTax = taxCalc(newwisStateBracketJoint,Math.max(0, income - 20470))
      }
    }
    else if(state == "Wyo."){
     
        stateTax = taxCalc(wyoStateBracket,income)
      
    }
    else if(state =="D.C."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newdcStateBracketSingle,Math.max(0, income - 12550))
      }else{
        stateTax = taxCalc(newdcStateBracketJoint,Math.max(0, income - 25100))
      }

    }         
  } 
else if(year =="2022"){
   if(state =="Ala."){
       if(status =="Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newalaStateBracketSingle,Math.max(0, income - 2500))
      }else{
        stateTax = taxCalc(newalaStateBracketJoint,Math.max(0, income - 7500))
      }
    }
    else if(state =="Alaska"){
    
        stateTax = taxCalc(alaskaStateBracket,income)
    }
    else if(state =="Ariz."){
       if(status =="Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newarizStateBracketSingle,Math.max(0, income - 12950))
      }else{
        stateTax = taxCalc(newarizStateBracketJoint,Math.max(0, income - 25900))
      }
    }
    else if(state =="Ark."){
       if(status =="Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newarkStateBracketSingle,Math.max(0, income - 2200))
      }else{
        stateTax = taxCalc(newarkStateBracketJoint,Math.max(0, income - 4400))
      }
    }
    else if(state =="Calif."){
       if(status =="Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newcaliStateBracketSingle,Math.max(0, income - 4803))
      }else{
        stateTax = taxCalc(newcaliStateBracketJoint,Math.max(0, income - 9606))
      }
    }
    else if(state =="Colo."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(coloStateBracket,Math.max(0, income - 12950))
      }else{
        stateTax = taxCalc(coloStateBracket,Math.max(0, income - 25900))
      }
        
    
    }
    else if(state == "Conn."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newconnStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newconnStateBracketJoint,income)
      }
    }
    else if(state == "Del."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newdelStateBracketSingle,Math.max(0, income - 3250))
      }else{
        stateTax = taxCalc(newdelStateBracketJoint,Math.max(0, income - 6500))
      }
    }
    else if(state == "Fla."){
        stateTax = taxCalc(flaStateBracket,income)
    }
     else if(state == "Ga."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newgaStateBracketSingle,Math.max(0, income - 4600))
      }else{
        stateTax = taxCalc(newgaStateBracketJoint,Math.max(0, income - 6000))
      }
    }
    else if(state == "Hawaii"){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newhawaiiStateBracketSingle,Math.max(0, income - 2200))
      }else{
        stateTax = taxCalc(newhawaiiStateBracketJoint,Math.max(0, income - 4400))
      }
    }
    else if(state == "Idaho"){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newidahoStateBracketSingle,Math.max(0, income - 12950))
      }else{
        stateTax = taxCalc(newidahoStateBracketJoint,Math.max(0, income - 25900))
      }
    }
    else if(state == "Ill."){
      
        stateTax = taxCalc(illStateBracket,income)   
    }
    else if(state == "Ind."){
    
        stateTax = taxCalc(indStateBracket,income)
    
    }
    else if(state == "Iowa"){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newiowaStateBracketSingle,Math.max(0, income - 2210))
      }else{
        stateTax = taxCalc(newiowaStateBracketJoint,Math.max(0, income - 5450))
      }
    }
    else if(state == "Kans."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newkansStateBracketSingle,Math.max(0, income - 3500))
      }else{
        stateTax = taxCalc(newkansStateBracketJoint,Math.max(0, income - 8000))
      }
    }
    else if(state == "Ky."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(kyStateBracket,Math.max(0, income - 2770))
      }else{
        stateTax = taxCalc(kyStateBracket,Math.max(0, income - 5540))
      }
       
    }
    else if(state == "Maine"){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newmaineStateBracketSingle,Math.max(0, income - 12950))
      }else{
        stateTax = taxCalc(newmaineStateBracketJoint,Math.max(0, income - 25900))
      }
    }
     else if(state == "Md."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newmdStateBracketSingle,Math.max(0, income - 2350))
      }else{
        stateTax = taxCalc(newmdStateBracketJoint,Math.max(0, income - 4700))
      }
    }
    else if(state == "Mass."){
  
        stateTax = taxCalc(massStateBracket,income)
      
    }
    else if(state == "Mich."){
       
        stateTax = taxCalc(michStateBracket,income)
    }
    else if(state == "Minn."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newminnStateBracketSingle,Math.max(0, income - 12900))
      }else{
        stateTax = taxCalc(newminnStateBracketJoint,Math.max(0, income - 25800))
      }
    }
    else if(state == "Miss."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newmissStateBracketSingle,Math.max(0, income - 2300))
      }else{
        stateTax = taxCalc(newmissStateBracketJoint,Math.max(0, income - 4600))
      }
    }
    else if(state == "Mo."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newmoStateBracketSingle,Math.max(0, income - 12950))
      }else{
        stateTax = taxCalc(newmoStateBracketJoint,Math.max(0, income - 25900))
      }
    }
    else if(state == "Mont."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newmontStateBracketSingle,Math.max(0, income - 4830))
      }else{
        stateTax = taxCalc(newmontStateBracketJoint,Math.max(0, income - 9660))
      }
    }
    else if(state == "Nebr."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newnebrStateBracketSingle,Math.max(0, income - 7350))
      }else{
        stateTax = taxCalc(newnebrStateBracketJoint,Math.max(0, income - 14700))
      }
    }
    else if(state == "Nev."){
       
        stateTax = taxCalc(nevStateBracket, income)

    }
     else if(state == "N.H."){
     
        stateTax = taxCalc(nhStateBracket,income)
     
    }
    else if(state == "N.J."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newnjStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newnjStateBracketJoint,income)
      }
    }
    else if(state == "N.M."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newnmStateBracketSingle,Math.max(0, income - 12950))
      }else{
        stateTax = taxCalc(newnmStateBracketJoint,Math.max(0, income - 25900))
      }
    }
    else if(state == "N.Y."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newnyStateBracketSingle,Math.max(0, income - 8000))
      }else{
        stateTax = taxCalc(newnyStateBracketJoint,Math.max(0, income - 16050))
      }
    }
    else if(state == "N.C."){
        if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(ncStateBracket,Math.max(0, income - 12750))
      }else{
        stateTax = taxCalc(ncStateBracket,Math.max(0, income - 25500))
      }
        
    }
    else if(state == "N.D."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newndStateBracketSingle,Math.max(0, income - 12950))
      }else{
        stateTax = taxCalc(newndStateBracketJoint,Math.max(0, income - 25900))
      }
    }
    else if(state == "Ohio"){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newohioStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newohioStateBracketJoint,income)
      }
    }
    else if(state == "Okla."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newoklaStateBracketSingle,Math.max(0, income - 6350))
      }else{
        stateTax = taxCalc(newoklaStateBracketJoint,Math.max(0, income - 12700))
      }
    }
    else if(state == "Ore."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(neworeStateBracketSingle,Math.max(0, income - 2420))
      }else{
        stateTax = taxCalc(neworeStateBracketJoint,Math.max(0, income - 4840))
      }
    }
     else if(state == "Pa."){

        stateTax = taxCalc(paStateBracket,income)
     
    }
    else if(state == "R.I."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newriStateBracketSingle,Math.max(0, income - 9300))
      }else{
        stateTax = taxCalc(newriStateBracketJoint,Math.max(0, income - 18600))
      }
    }
    else if(state == "S.C."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newscStateBracketSingle,Math.max(0, income - 12950))
      }else{
        stateTax = taxCalc(newscStateBracketJoint,Math.max(0, income - 25900))
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
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newvtStateBracketSingle,Math.max(0, income - 6350))
      }else{
        stateTax = taxCalc(newvtStateBracketJoint,Math.max(0, income - 12700))
      }
    }
    else if(state == "Va."){
       if(status="Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newvaStateBracketSingle,Math.max(0, income - 4500))
      }else{
        stateTax = taxCalc(newvaStateBracketJoint,Math.max(0, income - 9000))
      }
    }
    else if(state =="Wash."){
        stateTax = taxCalc(washStateBracket,income)
    }
    else if(state =="W.Va."){
       if(status="Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newwvaStateBracketSingle,income)
      }else{
        stateTax = taxCalc(newwvaStateBracketJoint,income)
      }
    }
    else if(state == "Wis."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newwisStateBracketSingle,Math.max(0, income - 11790))
      }else{
        stateTax = taxCalc(newwisStateBracketJoint,Math.max(0, income - 21820))
      }
    }
    else if(state == "Wyo."){
     
        stateTax = taxCalc(wyoStateBracket,income)
      
    }
    else if(state =="D.C."){
       if(status == "Single" || status == "Married Filing Seperately"){
        stateTax = taxCalc(newdcStateBracketSingle,Math.max(0, income - 12950))
      }else{
        stateTax = taxCalc(newdcStateBracketJoint,Math.max(0, income - 25900))
      }

    }     
  }
  return stateTax;
 
}

function ficaController(income){
   let ssCap = 137700;
   let ficaBracket = {one: [0,137700, .124], two: [0, Infinity, .029], three: [200001, Infinity, .009] }
  if(income < 400){
    return 0;
  } 
  else{
   return taxCalc(ficaBracket, income)
  }
}

function fedTaxController(year, status, income){
  let fedTax = 0;
   let newfedBracketSingle = {ten:[0,10275,.10], twelve: [10276, 41775, .12], twentytwo: [41776, 89075, .22],twentyfour: [89076,170050, .24], thirtytwo: [170051,215950, .32], thirtyfive: [215951,539900, .35], thirtyseven: [539901, Infinity , .37] }
  let newfedBracketJointWed = {ten:[0,20550,.10], twelve: [20551, 83550, .12], twentytwo: [83551, 178150, .22], twentyfour: [178151,340100,.24], thirtytwo: [340101,431900, .32], thirtyfive: [431901,647850, .35], thirtyseven: [647851, Infinity , .37] }
  let newfedBracketSepWed = {ten:[0,10275,.10], twelve: [10276, 41775, .12], twentytwo: [41776, 89075, .22],twentyfour: [89076,170050, .24], thirtytwo: [170051,215950, .32], thirtyfive: [215951,539900, .35], thirtyseven: [539901, Infinity , .37] }
  let newfedBracketHead = {ten:[0,14650,.10], twelve: [14651, 55900, .12], twentytwo: [55901, 89050, .22],twentyfour: [89051,170050, .24], thirtytwo: [170051, 215950, .32], thirtyfive: [215951,539900, .35], thirtyseven: [539901, Infinity , .37] }

  let oldfedBracketSingle = {ten:[0,9950,.10], twelve: [9951, 40525, .12], twentytwo: [40526, 86375, .22],twentyfour: [86376,164925, .24], thirtytwo: [164926,209425, .32], thirtyfive: [209426,523600, .35], thirtyseven: [523601, Infinity , .37] }
  let oldfedBracketJointWed = {ten:[0,19900,.10], twelve: [19901, 81050, .12], twentytwo: [81051, 172750, .22], twentyfour: [172751,329850,.24], thirtytwo: [329851,418850, .32], thirtyfive: [418851,628300, .35], thirtyseven: [628300, Infinity , .37] }
  let oldfedBracketSepWed = {ten:[0,9700,.10], twelve: [9701, 39475, .12], twentytwo: [39476, 84200, .22],twentyfour: [84201,160725, .24], thirtytwo: [160726,204100, .32], thirtyfive: [204101,510300, .35], thirtyseven: [510300, Infinity , .37] }
  let oldfedBracketHead = {ten:[0,14200,.10], twelve: [14201, 54200, .12], twentytwo: [54201, 86350, .22],twentyfour: [86351,164900, .24], thirtytwo: [164901, 209400, .32], thirtyfive: [209401,523600, .35], thirtyseven: [523601, Infinity , .37] }
  if(year == "2021"){
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
  else if(year == "2022"){
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
  if(year == "2022"){
    if(status == "Single"){
      deduction = 12950;
    }
    else if(status == "Married Filing Jointly"){
      deduction = 25900;
    }
    else if(status == "Married Filing Seperately"){
      deduction = 12950;
    }
    else if(status == "Head of Household"){
      deduction = 19400;
    }
  }
  else if(year == "2021"){
     if(status == "Single"){
      deduction = 12550;
    }
    else if(status == "Married Filing Jointly"){
      deduction = 25100;
    }
    else if(status == "Married Filing Seperately"){
      deduction = 12550;
    }
    else if(status == "Head of Household"){
      deduction = 18800;
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
      agi = income  - (ficaController(income * .9235)/ 2);
       showWork.totalFica =   roundPenny(ficaController(income * .9235));
      showWork.agi = roundPenny(agi);
      totalFed = fedTaxController(year, status, agi);
      showWork.totalFed = roundPenny(totalFed); 
      totalTax = totalFed + stateTaxController(year, state, status, income);
      showWork.totalState = roundPenny(stateTaxController(year, state,status, income)); 
    //medicare + aid tax
      totalTax = totalTax + ficaController(income * .9235);
      showWork.remainder =  income - totalTax
  }else{   
    agi = income  - (ficaController(income * .9235)/ 2);
    totalTax =  stateTaxController(year, state, status, agi); 
  
    //medicare + aid tax
    totalTax = totalTax + ficaController(income * .9235);
      showWork.totalFed = 0;
      showWork.totalFica =   roundPenny(ficaController(income * .9235));
      showWork.totalState = roundPenny(stateTaxController(year, state,status, agi)); 
      showWork.remainder =  income - totalTax
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

  var year = "2022";
$toggle.onclick = function(){
  if ($year.offsetLeft == "0"){
    year = "2022";
 } 
  else if($year.offsetLeft == "40"){
    year = "2021";
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
  $chart.scrollIntoView()
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
  <p>You Keep: ${formatter.format(showWork.remainder)} </p>
  <p>Federal Tax: ${formatter.format(showWork.totalFed)} </p>
  <p>State Tax: ${formatter.format(showWork.totalState)} </p>
  <p>Self-Employment Tax: ${formatter.format(showWork.totalFica)} </p>
 <p>Estimated Tax: ${formatter.format(divider(myTax *.90, 4))} per quarter </p>
<p>Tax Percent: ${myTaxPercent}% </p>
`

// $results.innerHTML= myTax + "";

  
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



