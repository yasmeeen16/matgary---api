<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="/assets/js/jquery.3.2.1.min.js" type="text/javascript"></script>

<h1>home</h1>
<%data.forEach(function(category){ %>



  <div class="dropdown">
  <button class="dropbtn"><%=category.Ename%></button>
  <div class="dropdown-content">

  </div>
  </div>


<%});%>




<script >


$.ajax({
       type : "GET",
       dataType : "jsonp",
       url : "http://localhost:8090/category/subcategories/5c6bf299f0f5d96d237e6ffe",
       success: function(data){
             alert(data);
       }
      });

</script>
<p>----------------------------------------</p>
<p><%= data[1].Aname%></p>
