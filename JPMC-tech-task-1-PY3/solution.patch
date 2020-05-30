diff --git a/client.py b/client.py
index 40badcd..e8b44b1 100644
--- a/client.py
+++ b/client.py
@@ -35,14 +35,17 @@ def getDataPoint(quote):
 	stock = quote['stock']
 	bid_price = float(quote['top_bid']['price'])
 	ask_price = float(quote['top_ask']['price'])
-	price = bid_price
+	price = (bid_price + ask_price)/2
 	return stock, bid_price, ask_price, price
 
 def getRatio(price_a, price_b):
 	""" Get ratio of price_a and price_b """
 	""" ------------- Update this function ------------- """
 	""" Also create some unit tests for this function in client_test.py """
-	return 1
+	if (price_b == 0):
+		# when price_b is 0 avoid throwing ZeroDivisionError
+		return
+	return price_a/price_b
 
 # Main
 if __name__ == "__main__":
@@ -52,8 +55,10 @@ if __name__ == "__main__":
 		quotes = json.loads(urllib2.urlopen(QUERY.format(random.random())).read())
 
 		""" ----------- Update to get the ratio --------------- """
+		prices = {}
 		for quote in quotes:
 			stock, bid_price, ask_price, price = getDataPoint(quote)
+			prices[stock] = price
 			print "Quoted %s at (bid:%s, ask:%s, price:%s)" % (stock, bid_price, ask_price, price)
 
-		print "Ratio %s" % getRatio(price, price)
+		print "Ratio %s" % getRatio(prices['ABC'], prices['DEF'])
diff --git a/client_test.py b/client_test.py
index a608a01..8462584 100644
--- a/client_test.py
+++ b/client_test.py
@@ -1,5 +1,5 @@
 import unittest
-from client import getDataPoint
+from client import getDataPoint, getRatio
 
 class ClientTest(unittest.TestCase):
   def test_getDataPoint_calculatePrice(self):
@@ -8,6 +8,8 @@ class ClientTest(unittest.TestCase):
       {'top_ask': {'price': 121.68, 'size': 4}, 'timestamp': '2019-02-11 22:06:30.572453', 'top_bid': {'price': 117.87, 'size': 81}, 'id': '0.109974697771', 'stock': 'DEF'}
     ]
     """ ------------ Add the assertion below ------------ """
+    for quote in quotes:
+      self.assertEqual(getDataPoint(quote), (quote['stock'], quote['top_bid']['price'], quote['top_ask']['price'], (quote['top_bid']['price'] + quote['top_ask']['price'])/2))
 
   def test_getDataPoint_calculatePriceBidGreaterThanAsk(self):
     quotes = [
@@ -15,11 +17,35 @@ class ClientTest(unittest.TestCase):
       {'top_ask': {'price': 121.68, 'size': 4}, 'timestamp': '2019-02-11 22:06:30.572453', 'top_bid': {'price': 117.87, 'size': 81}, 'id': '0.109974697771', 'stock': 'DEF'}
     ]
     """ ------------ Add the assertion below ------------ """
+    for quote in quotes:
+      self.assertEqual(getDataPoint(quote), (quote['stock'], quote['top_bid']['price'], quote['top_ask']['price'], (quote['top_bid']['price'] + quote['top_ask']['price'])/2))
 
 
   """ ------------ Add more unit tests ------------ """
+  def test_getRatio_priceBZero(self):
+    price_a = 119.2
+    price_b = 0
+    self.assertIsNone(getRatio(price_a, price_b))
 
+  def test_getRatio_priceAZero(self):
+    price_a = 0
+    price_b = 121.68
+    self.assertEqual(getRatio(price_a, price_b), 0)
 
+  def test_getRatio_greaterThan1(self):
+    price_a = 346.48
+    price_b = 166.39
+    self.assertGreater(getRatio(price_a, price_b), 1)
+
+  def test_getRatio_LessThan1(self):
+    price_a = 166.39
+    price_b = 356.48
+    self.assertLess(getRatio(price_a, price_b), 1)
+
+  def test_getRatio_exactlyOne(self):
+    price_a = 356.48
+    price_b = 356.48
+    self.assertEqual(getRatio(price_a, price_b), 1)
 
 if __name__ == '__main__':
     unittest.main()
