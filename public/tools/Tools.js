var Search = function(){
  this.searchPanel = $('<div>').addClass('toolPanel col-xs-8 animated fadeInUp').css('padding-left','15px').css('padding-right','15px').css('margin-top','15px');
  this.searchPanel.height('125').css('width','calc(100% - 15px)').css('margin-left','15px');
  this.searchPanel.css('background','rgba(246, 246, 246, 0.31)');
  this.searchForm = $('<div>').addClass("searchForm");
  this.searchPanel.append(input('Find'));
};
Search.prototype = {
  assemble: function(){
    return $(this.searchPanel);
  }
};

var LinkedData = function(){
    var self = this;
    this.Members = {keys:['members','invitees','guests'],data:[]};
    syncJSON('/members',function(data){console.log(data);self.Members.data = data});
    this.Teams =  {keys:['teams'],data:[]};
    syncJSON('/teams',function(data){console.log(data);self.Teams.data = data});
    this.Projects =  {keys:['projects'],data:[]};
    syncJSON('/projects',function(data){console.log(data);self.Projects.data = data});
    this.Roles =  {keys:['roles'],data:[]};
    syncJSON('/roles',function(data){console.log(data);self.Roles.data = data});
    this.Events =  {keys:['events'],data:[]};
    syncJSON('/events',function(data){console.log(data);self.Events.data = data});
    this.Multi = {keys:['to','assignees'],data:[]};
    syncJSON('/members',function(data){console.log(data);self.Multi.data = data});
}

var InputForm = function(inputs,toolData){
  var linkedData = new LinkedData();
  this.inputPanel = $('<div>').addClass('toolPanel col-xs-8 animated fadeInUp').css('width','calc(100% - 15px)').css('margin-left','15px').css('padding-left','15px').css('padding-right','15px').css('margin-top','15px');
  this.inputPanel.css('height','100%');
  this.inputPanel.css('background','rgba(246, 246, 246, 0.31)');
  this.inputForm = $('<div>').addClass("inputForm");
  var self2 = this;
  $.each(inputs,function(inputName){
      inputName = this;
      var newInput = input(this).addClass('name-form delay-1 animated fadeInUp text-center');
      $.each(linkedData.Members.keys,function(){
          //console.log(this.toString(),inputName.toLowerCase());console.log(this.toString()==inputName.toLowerCase());
          if(this.toString()==inputName.toLowerCase()){
              $(newInput).autocomplete({
                  source:linkedData.Members.data,
                  minLength: 0,
                  select: function (event, ui) {
                      $("#search").val(ui.item.label);
                      return false;
                  }
              });
              $(newInput).data("ui-autocomplete")._renderItem = autocompleteCard;
              self2.inputPanel.append(
                  newInput
              );
          }else{
              self2.inputPanel.append(
                  newInput
              );
          }


      });
      $.each(linkedData.Teams.keys,function(){
          //console.log(this.toString(),inputName.toLowerCase());console.log(this.toString()==inputName.toLowerCase());
          if(this.toString()==inputName.toLowerCase()){
              $(newInput).autocomplete({
                  source:linkedData.Teams.data,
                  minLength: 0,
                  select: function (event, ui) {
                      $("#search").val(ui.item.label);
                      return false;
                  }
              });
              $(newInput).data("ui-autocomplete")._renderItem = autocompleteCard;
              self2.inputPanel.append(
                  newInput
              );
          }else{
              self2.inputPanel.append(
                  newInput
              );
          }
      });
      $.each(linkedData.Projects.keys,function(){
          //console.log(this.toString(),inputName.toLowerCase());console.log(this.toString()==inputName.toLowerCase());
          if(this.toString()==inputName.toLowerCase()){
              $(newInput).autocomplete({
                  source:linkedData.Projects.data,
                  minLength: 0,
                  select: function (event, ui) {
                      $("#search").val(ui.item.label);
                      return false;
                  }
              });
              $(newInput).data("ui-autocomplete")._renderItem = autocompleteCard;
              self2.inputPanel.append(
                  newInput
              );
          }else{
              self2.inputPanel.append(
                  newInput
              );
          }
      });
      $.each(linkedData.Roles.keys,function(){
          //console.log(this.toString(),inputName.toLowerCase());console.log(this.toString()==inputName.toLowerCase());
          if(this.toString()==inputName.toLowerCase()){
              $(newInput).autocomplete({
                  source:linkedData.Roles.data,
                  minLength: 0,
                  select: function (event, ui) {
                      $("#search").val(ui.item.label);
                      return false;
                  }
              });
              $(newInput).data("ui-autocomplete")._renderItem = autocompleteCard;
              self2.inputPanel.append(
                  newInput
              );
          }else{
              self2.inputPanel.append(
                  newInput
              );
          }
      });
      $.each(linkedData.Events.keys,function(){
          //console.log(this.toString(),inputName.toLowerCase());console.log(this.toString()==inputName.toLowerCase());
          if(this.toString()==inputName.toLowerCase()){
              $(newInput).autocomplete({
                  source:linkedData.Events.data,
                  minLength: 0,
                  select: function (event, ui) {
                      $("#search").val(ui.item.label);
                      return false;
                  }
              });
              $(newInput).data("ui-autocomplete")._renderItem = autocompleteCard;
              self2.inputPanel.append(
                  newInput
              );
          }else{
              self2.inputPanel.append(
                  newInput
              );
          }
      });
      $.each(linkedData.Multi.keys,function(){
          //console.log(this.toString(),inputName.toLowerCase());console.log(this.toString()==inputName.toLowerCase());
          if(this.toString()==inputName.toLowerCase()){
              $(newInput).autocomplete({
                  source:linkedData.Multi.data,
                  minLength: 0,
                  select: function (event, ui) {
                      event.preventDefault();
                      $(newInput).val(ui.item.label);
                      return false;
                  }
              });
              $(newInput).data("ui-autocomplete")._renderItem = autocompleteCard;
              self2.inputPanel.append(
                  newInput
              );
          }else{
              self2.inputPanel.append(
                  newInput
              );
          }
      });
  });
  console.log(toolData);
  toolData.push({name:"Send",icon:'arrow-right'});
  console.log(toolData);
  $.each($('.toolCard'),function(){if($(this).find('.toolName').text() == "Send"){$(this).remove()}});
  $('.toolBar').replaceWith(new ToolBar(toolData).assemble());

};
InputForm.prototype = {
    assemble: function () {
        return $(this.inputPanel);
    }
};

var autocompleteCard = function(body,item){
    this.card =  $('<div>', {'data-value': item.label.toLowerCase()}).append(row().append(
        col(6).append( div().css(Styles.backgroundImage(item.icon)).height('80px').width('100%') ),
        col(6).append( text(item.label,'black','20px').css('font-family', 'Roboto Condensed, sans-serif'))
    )).appendTo(body.css('background-color',transparentWhiteHeavy()));
    return this.card;
}

var Send = function(){
    this.sendPanel = $('<div>').addClass('toolPanel col-xs-8 text-center animated fadeInUp').css('padding-left','15px').css('padding-right','15px').css('margin-top','15px');
    this.sendPanel.css('height','100%').css('width','calc(100% - 15px)').css('margin-left','15px');
    this.sendPanel.css('background','rgba(246, 246, 246, 0.31)');
};

Send.prototype = {
    assemble: function(formInputs){
      var routeBase = $('.topTitle').text().replace(/ /g,'').toLowerCase();
      var self = this;
      self.sendMessage = $('<div>').addClass("sendPanel").text("Message sent!");
      $.post('http://localhost:2101/'+routeBase+'/add',{inputs:formInputs},function(data){
        console.log(data);
        $('.sendPanel').text(data.message);
      });
      return $(self.sendPanel).append(self.sendMessage);
    }
};

var Delete = function(){
  this.deletePanel = $('<div>').addClass('toolPanel');
}
Delete.prototype = {
  assemble: function(){
    return $(this.deletePanel);
  }
}

var Edit = function(){
  this.editPanel = $('<div>').addClass('toolPanel');
}
Edit.prototype = {
  assemble: function(){
    return $(this.assemblePanel);
  },
}

var Back = function(){
  this.backPanel = $('<div>').addClass('toolPanel');
}
Back.prototype = {
  assemble: function(){
    return $(this.backPanel);
  },
}

var More = function(){
  this.morePanel = $('<div>').addClass('toolPanel');
}
More.prototype = {
  assemble: function(){
    return $(this.morePanel);
  },
}
