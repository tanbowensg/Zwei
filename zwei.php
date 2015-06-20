<!DOCTYPE html>
<html>
<head>
 <meta charset='utf-8'>
  <meta name='viewport' content='height=1136 '>
	<title>ZWEI</title>
	      <style> 
         body {
            background: #dddddd;
            color: black;
                        margin: 0px;
            padding: 0px;
         }

         #canvas {
            margin: 0px;
            padding: 0px;
            background: #000;
            border: thin inset #aaaaaa;
         }
         div{
          display: none;
         }
      </style>
	
</head>

<body>
    <canvas id='canvas'>
      Canvas not supported
    </canvas>
    <div><img src='title.png' ></div>
    <script type="text/javascript" src="jquery.js"></script>
    <script type="text/javascript" src="requestNextAnimationFrame.js"></script>
    <script type="text/javascript" src="objects.js"></script>
<script type="text/javascript" src="html5.js"></script>


  </body>
  </html>

  <?php 
    $dbc=mysqli_connect('localhost','root','joygame1','zwei');
      $query1 = "SELECT click FROM zwei";
      $result=mysqli_query($dbc,$query1);
      $clicknum=mysqli_fetch_array($result);
      $clicknum[0]++;
      $query2="UPDATE zwei SET click='$clicknum[0]'";
      $result2=mysqli_query($dbc,$query2);
      
  ?>