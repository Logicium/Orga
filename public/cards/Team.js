var TeamCard = function(newData){
    console.log(newData);
    var self = this;
    self.card = col(12).addClass('card').css('margin-top','10px');
    self.content = div().css('min-height','225px').css('margin-right','-15px').css('background-color',transparentWhite());
    self.namedImage = row().css(Styles.backgroundImage(newData.icon)).css('background-position','50% 50%').css('min-height','225px');
    self.infoCol = col(8);
    self.membersCol = col(4).css('padding-top','10px').css('min-height','225px').css('background-color',transparentWhite()).css('color','white');
    self.membersRow1 = row().css('padding-top','10px');
    self.membersRow2 = row().css('padding-top','10px').append(col(1));
    self.membersRow3 = row().css('padding-top','10px');
    self.membersRow4 = row().css('padding-top','10px').append(col(1));
    self.membersRow5 = row().css('padding-top','10px');
    $.each(['','','','','',''],function(){self.membersRow1.append(new MemberIcon(2,'public/images/demo/member.jpg'))});
    $.each(['','','','',''],function(){self.membersRow2.append(new MemberIcon(2,'public/images/demo/member.jpg'))});
    $.each(['','','','','',''],function(){self.membersRow3.append(new MemberIcon(2,'public/images/demo/member.jpg'))});
    $.each(['','','','',''],function(){self.membersRow4.append(new MemberIcon(2,'public/images/demo/member.jpg'))});
    $.each(['','','','','',''],function(){self.membersRow5.append(new MemberIcon(2,'public/images/demo/member.jpg'))});
    self.membersCol.append(self.membersRow1, self.membersRow2, self.membersRow3, self.membersRow4, self.membersRow5);
    self.name = div().append(highlightText(newData.name).css('font-size','30px').css('margin','0 auto')).removeClass('text-center').addClass('text-left').css('padding-top','25px');
    self.desc = div().append(highlightTextLight(newData.description).css('font-size','18px').css('margin','0 auto')).removeClass('text-center').addClass('text-left').css('padding-top','80px');
    self.card.append( self.content.append( self.namedImage.append(self.infoCol.append(self.name,self.desc) , self.membersCol )));
    self.viewFull = div().addClass('animated fadeIn viewFull').css(Styles.click()).css('background-color',transparentBlack()).css({'height':'100%','width':'calc( 100% - 15px )','position':'absolute','z-index':'10'}).append(
        text('View Full','white','24px').css('letter-spacing','6px').css('text-transform', 'uppercase')
            .css('font-family','Open Sans Condensed').css({'padding-top':'75px'})
    ).click(function(){$('.activityPanel').replaceWith(new EventPage(newData));});
    this.card.click(function(){
        $('.viewFull').detach();
        self.card.prepend(self.viewFull);
        $('.eastNavi').replaceWith(new DetailCard(newData));
    });
    return self.card;
};
