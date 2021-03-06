//View Full Page Button
//Title Over Top picture

var PrivateDetailCard = function(json){
    var self = this;
    this.card = col(2).addClass('animated fadeInRight eastNavi').css('height','100vh').css('padding','0').css('background-color',transparentWhite());
    this.props = div().css('padding','15px').height('100vh').css('overflow-y','scroll');
    var pathName = '';
    iterate(json,0,pathName);
    function iterate(obj,count,pathName) {
        var count = count || 0;
        console.log('count'+count);
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                if (obj[property] instanceof Array && obj[property].length>0) {
                    var propertyString = property;
                    propertyString = '.'+propertyString;
                    self.props.append(new ArrayTitle(property,pathName+propertyString,obj[property][0]));
                    iterate(obj[property],count,pathName+propertyString);
                }
                else if (typeof obj[property] == "object") {
                    self.props.append(new PropTitle(property));
                    var propertyString = property;
                    propertyString = '.'+propertyString;
                    iterate(obj[property],count,pathName+propertyString);
                }
                else {
                    console.log(property + "   " + obj[property]);
                    self.props.append(new PrivateProperty(property,obj[property],count,pathName));
                    count+=1;
                }
            }
        }
    }

    this.image = div().css(Styles.backgroundImage(json.icon)).css({'width':'100%','height':'300px'});
    this.title = titleSm(json.fullName || json.name).css('font-weight','500').css('color','white');
    if(json.icon){ return this.card.append(this.props.prepend(this.image,this.title)); }
    else{ return this.card.append(this.props); }

};

var DetailCard = function(json){
    console.log(json);
    var self = this;
    var cardCss = {'padding':'0','height':'!important 0px','pointer-events':'none'};
    this.card = span().addClass('eastNavi settingsProps').css(cardCss);
    this.card.attr('data-objectdata',JSON.stringify(json));
    this.props = div().addClass('animated fadeInRight').css({'background-color':transparentWhite(),'padding':'15px','pointer-events':'initial'}).height('100vh').css('overflow-y','scroll');
    var pathName = '';
    iterate(json,0,pathName);
    function iterate(obj,count,pathName) {
        var count = count || 0;
        console.log('count'+count);
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                if (obj[property] instanceof Array && obj[property].length>0) {
                    var propertyString = property;
                    propertyString = '.'+propertyString;
                    self.props.append(new SimpleArrayTitle(property,pathName+propertyString,obj[property][0]));
                    iterate(obj[property],count,pathName+propertyString);
                }
                else if (typeof obj[property] == "object") {
                    self.props.append(new PropTitle(property));
                    var propertyString = property;
                    propertyString = '.'+propertyString;
                    iterate(obj[property],count,pathName+propertyString);
                }
                else {
                    console.log(property + "   " + obj[property]);
                    self.props.append(new PropertyTall(property,obj[property],count,pathName));
                    count+=1;
                }
            }
        }
    }
    //this.card.resizable();
    this.image = div().css(Styles.backgroundImage(json.icon)).css({'width':'100%','height':'300px'});
    this.title = titleSm(json.fullName || json.name).css('font-weight','500').css('color','white');
    if(json.icon){ return this.card.append(this.props.prepend(this.image,this.title)); }
    else{ return this.card.append(this.props); }

};
