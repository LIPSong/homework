var prime = function (num) {
	for (var i = 2; i <= Math.sqrt(num); i++ )
		{
			if (num % i == 0)
			{
				return false;
			}
		}
		return true;
	}
onmessage = function (e) {
	var arr= [1,2];
	var date1 = new Date();
	for (var i = e.data.num1; i < e.data.num2; i++)
	{
		  if(prime(i)){  arr[arr.length] = i;	}
		//primeNumber(i) && console.log("��"+ index++ +"��������"+i);	
	}
	var date2 = new Date();
	var result = new Object();
	result["arr"] = arr;
	result["time"] = date2.getTime()-date1.getTime();
	postMessage(result);
//	console.log(arr.length);
//	console.log (date2.getTime()-date1.getTime()+"����");
}