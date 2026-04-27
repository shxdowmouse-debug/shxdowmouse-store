<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">

<xsl:template match="/">

<html>
<head>
<title>shxdowmouse sitemap</title>

<style>
body{
background:#000;
color:#fff;
font-family:Inter,Arial,sans-serif;
padding:60px;
margin:0;
}

.wrap{
max-width:1000px;
margin:auto;
}

.logo{
font-size:52px;
font-weight:800;
letter-spacing:-2px;
opacity:.95;
margin-bottom:10px;
}

.sub{
color:rgba(255,255,255,.55);
margin-bottom:40px;
}

.card{
background:rgba(255,255,255,.03);
border:1px solid rgba(255,255,255,.08);
border-radius:28px;
padding:30px;
backdrop-filter:blur(20px);
}

.row{
padding:18px 0;
border-bottom:1px solid rgba(255,255,255,.06);
}

.row:last-child{
border-bottom:none;
}

a{
color:#fff;
text-decoration:none;
opacity:.85;
}

a:hover{
opacity:1;
}

.footer{
margin-top:30px;
color:rgba(255,255,255,.35);
font-size:14px;
}
</style>

</head>

<body>

<div class="wrap">

<div class="logo">shxdowmouse</div>
<div class="sub">XML Sitemap • Search Engine Index File</div>

<div class="card">

<xsl:for-each select="sitemap:urlset/sitemap:url">
<div class="row">
<a href="{sitemap:loc}">
<xsl:value-of select="sitemap:loc"/>
</a>
</div>
</xsl:for-each>

</div>

<div class="footer">
Built for precision.
</div>

</div>

</body>
</html>

</xsl:template>
</xsl:stylesheet>
