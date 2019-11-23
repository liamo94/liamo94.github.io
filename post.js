console.log(sum(infixToPostfix(("1 + 7"))));
console.log(sum(infixToPostfix(("1 + 2 * 3"))));
console.log(sum(infixToPostfix(("1 * ( 2 + 3 * 4 ) + 5"))));
console.log(sum(infixToPostfix(("2 * ( 7 + 10 )"))));

// console.log(sum(infixToPostfix(tokenize(("1 + 7")))));
// console.log(sum(infixToPostfix(tokenize(("1 + 2 * 3")))));
// console.log(sum(infixToPostfix(tokenize(("1 * ( 2 + 3 * 4 ) + 5")))));

// Algorithm from http://csis.pace.edu/~wolf/CS122/infix-postfix.htm
function infixToPostfix(infix) {
    infix = infix.split(' ');
    const presedences = ["-", "+", "*", "/"];

    var opsStack = [],
        postfix = [];

    console.log(infix);
    for (let i = 0; i < infix.length; i++) {
        // Step 1
        if (!isNaN(infix[i])) {
            postfix.push(infix[i]); continue;
        }
        let topOfStack = opsStack[opsStack.length - 1];
        // Step 2
        if (!opsStack.length || topOfStack == "(") {
            opsStack.push(infix[i]); continue;
        }
        // Step 3
        if (infix[i] == "(") {
            opsStack.push(infix[i]); continue;
        }
        // Step 4
        if (infix[i] == ")") {
            while (opsStack.length) {
                let op = opsStack.pop();
                if (op == "(") break;
                postfix.push(op);
            }
            continue;
        }
        // Step 5
        let prevPresedence = presedences.indexOf(topOfStack),
            currPresedence = presedences.indexOf(infix[i]);
        while (currPresedence < prevPresedence) {
            let op = opsStack.pop();
            postfix.push(op);
            prevPresedence = presedences.indexOf(opsStack[opsStack.length - 1]);
        }
        opsStack.push(infix[i]);
    }
    // Step 6
    while (opsStack.length) {
        let op = opsStack.pop();
        if (op == "(") break;
        postfix.push(op);
    }

    console.log(postfix);
    return postfix;
}

function tokenize(exp) {
    return exp
        .replace(/\s/g, "")
        .split("")
        .map((token, i) => /^\d$/.test(token) ? +token : token);
}

function log(obj) {
    document.querySelector("pre").textContent += JSON.stringify(obj) + "\n";
}

function sum(e) {
    var s = [];
    for (var i in e) {
        var t = e[i], n = +t
        if (n == t)
            s.push(n)
        else {
            var o2 = s.pop(), o1 = s.pop()
            switch (t) {
                case '+': s.push(o1 + o2); break;
                case '-': s.push(o1 - o2); break;
                case '*': s.push(o1 * o2); break;
                case 'x': s.push(o1 * o2); break;
                case '/': s.push(o1 / o2); break;
                case '^': s.push(Math.pow(o1, o2)); break;
            }
        }
    }
    return s[0];
}