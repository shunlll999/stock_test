import googlefinance 		from 'google-finance';
import utils				from '../utils/utils';
import knexDB				from '../knexDB';



exports.nasdaqNews = function (req,res){
	
	const symbol 		= 'NASDAQ:'+req.params.symbol;
	googlefinance.companyNews({
	  symbol:symbol
	}, function (err, news) {
		if( err )throw err;

		res.send(news);
	});

}

exports.nasdaqQuotes = function (req,res){
	
	const SYMBOL 		= 'NASDAQ:'+req.params.symbol;
	const FROM 			= (req.params.start != 0)?req.params.start:null;
	const TO 			= (req.params.end != 0)?req.params.end:null;

	googlefinance.historical({
	  symbol:SYMBOL,
	  from:FROM,
	  to:TO
	}, function (err, quotes) {
		if( err )throw err;

		

		var dataQuotes = [];

    	
		for( var index in quotes ){
    		var seperateFormatDate = quotes[index].date;
    		var formatDate = String(seperateFormatDate).split(" ");
    		var newDateFormat = formatDate[3]+"-"+utils.changeMonthNameToInt(formatDate[1])+"-"+formatDate[2];
    		dataQuotes.push({ 
    			d:newDateFormat,
    			volume:quotes[index].volume,
    			open:quotes[index].open,
    			high:quotes[index].high,
    			low:quotes[index].low,
    			close:quotes[index].close,
    			symbol:quotes[index].symbol,
    		});
		}
		console.log(dataQuotes);
		res.render('stock', { title:'Get Quotes', data:dataQuotes });
	});

}




