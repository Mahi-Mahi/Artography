<?php
	$bodyclass = "galerie";
	include ("_header.php");
?>

<div class="wrapper">

	<div class="entry-header clearfix">
		<nav id="main-nav">
			<ul class="unstyled">
				<li class="main-nav-item"><a href="#" class="home-item">Accueil</a></li>
				<li class="main-nav-item"><a href="#" class="active">Artistes</a></li>
				<li class="main-nav-item"><a href="#">Galeries</a></li>
			</ul>
		</nav><!-- .main-nav -->
		<p class="go-back">
			<a href="#">Retour</a>
		</p>
		<div class="entry-content">
			<section>
				<h1 class="entry-title">
					Anne Marie et Roland Pallade - Art Contemporain
				</h1>
				<div class="entry-meta clearfix">
					<p>Dirigé par Daniel Lelong <strong>+</strong> Jacques Dupin <strong>+</strong> Jean Frémon</p>
					<ul class="unstyled">
						<li class="entry-meta-item"><a href="#" target="_blank">Email</a></li>
						<li class="entry-meta-item"><a href="#" target="_blank">Site internet</a></li>
						<li class="entry-meta-item"><a href="#" target="_blank">Localiser</a></li>
					</ul>
				</div>
			</section>
			<aside>
				<div class="entry-description">
					<div class="inner">
						<p><strong>En 2013, 196 galeries </strong><br />françaises ont<br />exposé dans <strong>26 pays</strong>.</p>
					</div><!-- .inner -->
				</div><!-- .entry-description -->
			</aside>
		</div><!-- .entry-content -->
	</div><!-- .entry-header -->

	<div class="row main">

		<div class="col sidebar left-sidebar">
			<form action="about:blank">

				<fieldset>
					<legend>Période</legend>
					<ul class="unstyled filter">
						<li>
							<input type="radio" name="periode" id="periode-today" value="periode-today" />
							<label for="periode-today">Aujourd'hui</label>
						</li>
						<?php
							foreach(range('2014','1990') as $period) :
						?>
						<li>
							<input type="radio" name="periode" id="periode-<?php print $period ?>" value="periode-<?php print $period ?>" />
							<label for="periode-<?php print $period ?>"><?php print $period ?></label>
						</li>
						<?php
							endforeach;
						?>
					</ul>
				</fieldset>
			</form>

		</div><!-- .left-sidebar -->

		<div class="col content">
			<div class="content-block">
				&nbsp;
			</div><!-- .content-block -->
		</div><!-- .content -->

		<div class="col right-sidebar">
			<form action="about:blank">
				<input type="text" value="" class="input-sidebar" placeholder="Rechercher une galerie..." />
				<ul class="unstyled">
					<li class="galerie-item"><a href="#">Jet li</a></li>
					<li class="galerie-item"><a href="#">Arnold Schwarzenegger</a></li>
					<li class="galerie-item"><a href="#" class="active">Bruce Willis</a></li>
					<li class="galerie-item"><a href="#">Syvester Stallone</a></li>
					<li class="galerie-item"><a href="#">Jason Statham</a></li>
					<li class="galerie-item"><a href="#" class="active">Dolph Lundgren</a></li>
					<li class="galerie-item"><a href="#">Randy Couture</a></li>
					<li class="galerie-item"><a href="#">Mickey Rourke</a></li>
					<li class="galerie-item"><a href="#">Charisma Carpenter</a></li>
					<li class="galerie-item"><a href="#">Jean-Claude Van Damme</a></li>
					<li class="galerie-item"><a href="#">Antonio Banderas</a></li>
					<li class="galerie-item"><a href="#">Wesley Snipes</a></li>
					<li class="galerie-item"><a href="#">Jet li</a></li>
					<li class="galerie-item"><a href="#">Arnold Schwarzenegger</a></li>
					<li class="galerie-item"><a href="#">Bruce Willis</a></li>
					<li class="galerie-item"><a href="#">Syvester Stallone</a></li>
					<li class="galerie-item"><a href="#">Jason Statham</a></li>
					<li class="galerie-item"><a href="#">Dolph Lundgren</a></li>
					<li class="galerie-item"><a href="#">Randy Couture</a></li>
					<li class="galerie-item"><a href="#">Mickey Rourke</a></li>
					<li class="galerie-item"><a href="#">Charisma Carpenter</a></li>
					<li class="galerie-item"><a href="#">Jean-Claude Van Damme</a></li>
					<li class="galerie-item"><a href="#">Antonio Banderas</a></li>
					<li class="galerie-item"><a href="#">Wesley Snipes</a></li>
				</ul>
			</form>
		</div><!-- .right-sidebar -->

	</div><!-- .row -->

</div><!-- .wrapper -->

