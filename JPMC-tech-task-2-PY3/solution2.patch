From 359ec3f820b526c980de52d0396cd7093d5380cf Mon Sep 17 00:00:00 2001
From: Joe Ferrer <joe@insidesherpa.com>
Date: Wed, 16 Oct 2019 13:39:08 +0800
Subject: [PATCH] Make model solution

---
 src/App.tsx   | 24 ++++++++++++++++++------
 src/Graph.tsx | 14 ++++++++++----
 2 files changed, 28 insertions(+), 10 deletions(-)

diff --git a/src/App.tsx b/src/App.tsx
index 0728518..b83f979 100755
--- a/src/App.tsx
+++ b/src/App.tsx
@@ -8,6 +8,7 @@ import './App.css';
  */
 interface IState {
   data: ServerRespond[],
+  showGraph: boolean,
 }
 
 /**
@@ -22,6 +23,7 @@ class App extends Component<{}, IState> {
       // data saves the server responds.
       // We use this state to parse data down to the child element (Graph) as element property
       data: [],
+      showGraph: false,
     };
   }
 
@@ -29,18 +31,28 @@ class App extends Component<{}, IState> {
    * Render Graph react component with state.data parse as property data
    */
   renderGraph() {
-    return (<Graph data={this.state.data}/>)
+    if (this.state.showGraph) {
+      return (<Graph data={this.state.data}/>)
+    }
   }
 
   /**
    * Get new data from server and update the state with the new data
    */
   getDataFromServer() {
-    DataStreamer.getData((serverResponds: ServerRespond[]) => {
-      // Update the state by creating a new array of data that consists of
-      // Previous data in the state and the new data from server
-      this.setState({ data: [...this.state.data, ...serverResponds] });
-    });
+    let x = 0;
+    const interval = setInterval(() => {
+      DataStreamer.getData((serverResponds: ServerRespond[]) => {
+        this.setState({
+          data: serverResponds,
+          showGraph: true,
+        });
+      });
+      x++;
+      if (x > 1000) {
+        clearInterval(interval);
+      }
+    }, 100);
   }
 
   /**
diff --git a/src/Graph.tsx b/src/Graph.tsx
index ec1430e..ddd4d55 100644
--- a/src/Graph.tsx
+++ b/src/Graph.tsx
@@ -14,7 +14,7 @@ interface IProps {
  * Perspective library adds load to HTMLElement prototype.
  * This interface acts as a wrapper for Typescript compiler.
  */
-interface PerspectiveViewerElement {
+interface PerspectiveViewerElement extends HTMLElement {
   load: (table: Table) => void,
 }
 
@@ -31,8 +31,9 @@ class Graph extends Component<IProps, {}> {
   }
 
   componentDidMount() {
+    console.log('rendering');
     // Get element to attach the table from the DOM.
-    const elem: PerspectiveViewerElement = document.getElementsByTagName('perspective-viewer')[0] as unknown as PerspectiveViewerElement;
+    const elem = document.getElementsByTagName('perspective-viewer')[0] as unknown as PerspectiveViewerElement;
 
     const schema = {
       stock: 'string',
@@ -40,15 +41,20 @@ class Graph extends Component<IProps, {}> {
       top_bid_price: 'float',
       timestamp: 'date',
     };
-
-    if (window.perspective && window.perspective.worker()) {
+    if (window.perspective) {
       this.table = window.perspective.worker().table(schema);
     }
     if (this.table) {
+      console.log('change table');
       // Load the `table` in the `<perspective-viewer>` DOM reference.
 
       // Add more Perspective configurations here.
       elem.load(this.table);
+      elem.setAttribute('view', 'y_line');
+      elem.setAttribute('column-pivots', '["stock"]');
+      elem.setAttribute('row-pivots', '["timestamp"]');
+      elem.setAttribute('columns', '["top_ask_price"]');
+      elem.setAttribute('aggregates', '{"stock":"distinct count","top_ask_price":"avg","top_bid_price":"avg","timestamp":"distinct count"}');
     }
   }
 
-- 
2.17.1

