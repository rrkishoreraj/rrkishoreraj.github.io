/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */
// prints "hi" in the browser's dev tools console
console.log('hi');

function disableRadioButton(){
  if (document.getElementById("option2").checked == true){
    document.getElementById("changeName").innerHTML = "Prefix Expression";
  }
  document.getElementById("option1").disabled = true;
  document.getElementById("option2").disabled = true;
}

var infix_expr;
function infixTOPostfix(){
  disableRadioButton();
  var algo_description = "<br>Before starting with given expression, if you aren't sure about the of <b><i>\'algorithm\'</i></b>, then hit the button below...";
  infix_expr = document.getElementById("infix").value;
  document.getElementById("displayInfix").innerHTML = "<br>Given Infix Expression: " + infix_expr  + "<br>" + algo_description;
  document.getElementById("displayStack").style.display = "block";
}

function displayAlgorithm(){
  if (document.getElementById("option1").checked == true){
    if (document.getElementById("displayPostfixAlgo").style.display === "none")
      document.getElementById("displayPostfixAlgo").style.display = "block";
    else
      document.getElementById("displayPostfixAlgo").style.display = "none"
  }
  if (document.getElementById("option2").checked == true){
    if (document.getElementById("displayPrefixAlgo").style.display === "none")
      document.getElementById("displayPrefixAlgo").style.display = "block";
    else
      document.getElementById("displayPrefixAlgo").style.display = "none"
  }
}
/***********************************************************************************************/
function priority(element)
{
  if (element == '^')
    return 3;
  else if (element == '*')
    return 2;
  else if (element == '/')
    return 2;
  else if (element == '+')
    return 1;
  else if (element == '-')
    return 1;
  else
    return 0;
}
function priorityCheckOnStack(a)
{
  var stackVal = document.getElementById("stack").textContent;
  if (a == '('){
    var stackNode = document.createTextNode(a);
    var stack = document.getElementById("stack");
    stack.appendChild(stackNode);
  }
  else if (a == ')')
  {
    while (stackVal[stackVal.length-1] != '(')
    {
      //postfix[j++] = pop();
      var removeStack = stackVal.slice(-1);
      var remainingStack = stackVal.slice(0, stackVal.length-1);
      document.getElementById("stack").innerHTML = remainingStack;
      var postfixVal = document.getElementById("postfix_expression").textContent;
      var postfix = document.getElementById("postfix_expression").innerHTML = (postfixVal + removeStack);
      stackVal = document.getElementById("stack").textContent;
    }
    var removeObrace = stackVal.slice(0, stackVal.length-1);
    document.getElementById("stack").innerHTML = removeObrace;
  }
  else if ((priority(a) > priority(stackVal[stackVal.length - 1]))) {
    var stackNode = document.createTextNode(a);
    var stack = document.getElementById("stack");
    stack.appendChild(stackNode);
  }
  else if ((priority(a) != 0 && priority(stackVal[stackVal.length - 1]) != 0) && (priority(a) <= priority(stackVal[stackVal.length - 1])))
  {
    var stackLength = stackVal.length - 1;
    while ((priority(a) != 0 && priority(stackVal[stackLength]) != 0) && (priority(a) <= priority(stackVal[stackLength])))
    {
      //postfix[j++] = pop();
      var removeStack = stackVal.slice(-1);
      var remainingStack = stackVal.slice(0, stackLength);
      document.getElementById("stack").innerHTML = remainingStack;
      var postfixVal = document.getElementById("postfix_expression").textContent;
      var postfix = document.getElementById("postfix_expression").innerHTML = (postfixVal + removeStack);
      stackVal = document.getElementById("stack").textContent;
      stackLength--;
    }
    //push(a);
    var stackNode = document.createTextNode(a);
    var stack = document.getElementById("stack");
    stack.appendChild(stackNode);
  }
}
//(3+4*5/6)
var index = 0;
function startVisualize(exp){
  if (index < exp.length){
    switch (exp[index])
        {
      case '(':
      case ')':
      case '^':
      case '*':
      case '/':
      case '+':
      case '-':
        priorityCheckOnStack(exp[index]);
        break;
      default :
        var postNode = document.createTextNode(exp[index]);
        var postfix = document.getElementById("postfix_expression");
        postfix.appendChild(postNode);
        break;
    }
    index++;
  }
  else {
    var stackVal = document.getElementById("stack").textContent;
    while (stackVal.length > 0){
      if (stackVal[stackVal.length - 1] != '('){
        var removeStack = stackVal.slice(-1);
        var remainingStack = stackVal.slice(0, stackVal.length-1);
        document.getElementById("stack").innerHTML = remainingStack;
        var postfixVal = document.getElementById("postfix_expression").textContent;
        var postfix = document.getElementById("postfix_expression").innerHTML = (postfixVal + removeStack);
      }
      else{
        var removeObrace = stackVal.slice(0, stackVal.length-1);
        document.getElementById("stack").innerHTML = removeObrace;
      }
      stackVal = document.getElementById("stack").textContent;
    }
  }
}
/************************************************************************************************/
/*function moveRight(){
      var a = document.getElementById("diamond-shield").offsetLeft;
      a = a + 16;
      document.getElementById("diamond-shield").style.left = a + "px";
  }*/
function swapExpression(expr){
  var last = expr.length - 1;
  var reverseExpression = "";
  while(last >= 0){
    if (expr[last] == '(')
      reverseExpression += ')';
    else if(expr[last] == ')')
      reverseExpression += '(';
    else
      reverseExpression += expr[last];
    last--;
  }
  return reverseExpression;
}
function reversePrefixResult(){
  var prefixResult = swapExpression(document.getElementById("postfix_expression").textContent);
  document.getElementById("postfix_expression").innerHTML = prefixResult;
  document.getElementById("prefixFinal").style.display = "none";
  document.getElementById("refresh").style.display = "block";
  window.scrollBy(0, 500);
}
function visualize_expr(){
  var node;
  var div_element;
  var expression = infix_expr;
  if (document.getElementById("option2").checked == true){
    expression = swapExpression(infix_expr);
    document.getElementById("prefixDescription").innerHTML = "<br>Before performing the conversion, <b><i>\'reverse the given infix expression\'</i></b><br><br> The reversed <b><i>Infix Expression</i></b> is: " + expression;
  }
  if (visualize_expr.i < expression.length){
    node = document.createTextNode('\u00A0\u00A0\u00A0' + expression[visualize_expr.i]);
    visualize_expr.para_ele.appendChild(node);
    div_element = document.getElementById("div1");
    div_element.appendChild(visualize_expr.para_ele);
    visualize_expr.i++;
    //moveRight();
  }
  else{
    node = document.createTextNode("\u00A0\u00A0[ Reached end of expression ]");
    visualize_expr.para_ele.appendChild(node);
    div_element = document.getElementById("div1");
    div_element.appendChild(visualize_expr.para_ele);
    document.getElementById("visualize").disabled = true;
    if (document.getElementById("option2").checked == true){
      document.getElementById("reversePrefixResult").style.display = "block";
    }
    if (document.getElementById("option2").checked == false){
      document.getElementById("refresh").style.display = "block";
    }
  }
  startVisualize(expression);
  window.scrollBy(0, 500);
}
visualize_expr.i = 0;
visualize_expr.para_ele = document.createElement("p");
