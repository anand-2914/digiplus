let selectedNode = null;
const canvas = document.getElementById("tree-canvas");
const ctx = canvas.getContext("2d");

function drawArrow(fromX, fromY, toX, toY) {
  const headLength = 10;
  const angle = Math.atan2(toY - fromY, toX - fromX);

  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.lineTo(
    toX - headLength * Math.cos(angle - Math.PI / 6),
    toY - headLength * Math.sin(angle - Math.PI / 6)
  );
  ctx.moveTo(toX, toY);
  ctx.lineTo(
    toX - headLength * Math.cos(angle + Math.PI / 6),
    toY - headLength * Math.sin(angle + Math.PI / 6)
  );
  ctx.stroke();
}

function drawNode(x, y, text) {
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, 2 * Math.PI);
  ctx.fillStyle = "#e0e0e0";
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#333";
  ctx.font = "14px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
}

function addNode() {
  const nodeType = document.getElementById("nodeType").value;
  const nodeText = document.getElementById("nodeText").value;

  if (!nodeText) {
    alert("Please enter node text.");
    return;
  }

  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;

  drawNode(x, y, nodeText);

  if (selectedNode) {
    drawArrow(selectedNode.x, selectedNode.y, x, y);
  }

  document.getElementById("nodeText").value = "";
}

function updateNode() {
  const updatedText = prompt("Enter the updated text:");

  if (updatedText !== null && selectedNode) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTree(document.getElementById("tree-container"));
  }
}

function deleteNode() {
  if (selectedNode) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTree(document.getElementById("tree-container"));
    selectedNode = null;
  }
}

function selectNode(node) {
  if (selectedNode) {
    selectedNode.classList.remove("selected");
  }
  selectedNode = node;
  selectedNode.classList.add("selected");
}

function drawTree(container) {
  container.childNodes.forEach((node) => {
    if (node.nodeType === 1) {
      const rect = node.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      drawNode(x, y, node.textContent);

      if (node.classList.contains("selected")) {
        selectedNode = { x, y };
      }

      drawTree(node);
    }
  });
}

document
  .getElementById("tree-container")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("tree-node")) {
      selectNode(event.target);
    }
  });

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

drawTree(document.getElementById("tree-container"));
