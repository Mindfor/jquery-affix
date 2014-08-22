#Jquery Mindfor affix#

The affix will reflect which part of the content the user is reading/looking at. But the affix can also be used to jump to a certain section in the content.   

##Usage## 
* include jQuery: 
```<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>```
* add js: 
``` <script src="./mindfor.affix.js"></script>```    

##Affix##
call the plugin, with js  
$.mindforAffix()   
* $("#element").mindforAffix();
                            
##Options:##
attribute class="mindfor-affix-stop" is needed to move the element in the current container

##Example:##

```html
<!DOCTYPE html>
<html>
<head>
    <title>Mindfor affix Demo</title>
    <link rel="stylesheet" id="bootstrap-css" href="./bootstrap.min.css" type="text/css" media="all">
    <link rel="stylesheet" id="style-css" href="./style.css" type="text/css" media="all">
    <script type="text/javascript" src="./jquery.js"></script>
    <script type="text/javascript">
    jQuery(document).ready(function($) {
"use strict";
	// AFFIX SCRIPT
	var affixEnabled = false;
	function affixUpdate() {
		var width = $(window).width();
		if (!affixEnabled && width > 992) {
			$("#Affix").mindforAffix();
			affixEnabled = true;
		}
		else if (affixEnabled && width <= 992) {
			var affix = $("#Affix").mindforAffix();
			if (affix)
				affix.remove();
			affixEnabled = false;
		}
	}
	$(window).resize(affixUpdate);
	affixUpdate();
	updateFooter();
});
</script>
</head>
<body>
    <div id="wrapper">
        <!-- start header -->
        <header>
            <div class="navbar navbar-default navbar-static-top">
                <div class="container">
                    <div class="navbar-header">
                        <!--you header-->
                    </div>
                </div>
            </div>
        </header>
        <section id="content">
            <div class="container mindfor-affix-stop">
                <div class="row">
                    <div class="col-md-8 article">
                        <!--your content-->
                    </div>
                    <div class="col-md-4 col-xs-12">
                        <div class="page-content-sidebar" id="Affix">
                            <div class="hidden-sm hidden-xs page-contents" id="AffixNav">
                                <menu class="nav"></menu>
                            </div>
                            <!--div class="row page-short-info"-->
                            <!--your content-->
                            <!--/div-->
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <footer>
        <div class="container">
            <!--your footer-->
        </div>
    </footer>
    <script type="text/javascript" src="./bootstrap.min.js"></script>
    <script type="text/javascript" src="./mindfor.affix.js"></script>
</body>
</html>
```
