<?php
	$bodyclass = "";
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
					EXPLORATION <br />PAR <strong>ARTISTE</strong>
				</h1>
			</section>
			<aside>
				<div class="entry-description">
					<div class="inner">
						<p><strong>Aujourd'hui <br />111 artistes</strong> français <br />exposent dans <strong>22 pays</strong>.</p>
					</div><!-- .inner -->
				</div><!-- .entry-description -->
			</aside>
		</div><!-- .entry-content -->
	</div><!-- .entry-header -->

	<div class="main clearfix">

		<div class="sidebar left-sidebar">
			<form action="about:blank">
				<fieldset>
					<legend>Genre</legend>
					<ul class="unstyled filter">
						<li>
							<input type="radio" name="genre" id="masculin" value="masculin" />
							<label for="masculin">Masculin</label>
						</li>
						<li>
							<input type="radio" name="genre" id="feminin" value="feminin" />
							<label for="feminin">Féminin</label>
						</li>
						<li>
							<input type="radio" name="genre" id="collectif" value="collectif" />
							<label for="collectif">Collectif</label>
						</li>
					</ul>
				</fieldset>

				<fieldset>
					<legend>Âge</legend>
					<ul class="unstyled">
						<li>
							<input type="radio" name="age" id="age-0-25" value="age-0-25" />
							<label for="age-0-25">0 à 25 ans</label>
						</li>
						<li>
							<input type="radio" name="age" id="age-26-35" value="age-26-35" />
							<label for="age-26-35">26 à 35 ans</label>
						</li>
						<li>
							<input type="radio" name="age" id="age-36-45" value="age-36-45" />
							<label for="age-36-45">36 à 45 ans</label>
						</li>
						<li>
							<input type="radio" name="age" id="age-46-55" value="age-46-55" />
							<label for="age-46-55">46 à 55 ans</label>
						</li>
					</ul>
				</fieldset>

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

		<div class="content">
			&nbsp;
			<div class="right-sidebar">
				<form action="about:blank">
					<input type="text" value="" class="input-sidebar" placeholder="Rechercher un artiste..." />
					<ul class="unstyled">
						<li class="artist-item"><a href="#">Jet li</a></li>
						<li class="artist-item"><a href="#">Arnold Schwarzenegger</a></li>
						<li class="artist-item"><a href="#" class="active">Bruce Willis</a></li>
						<li class="artist-item"><a href="#">Syvester Stallone</a></li>
						<li class="artist-item"><a href="#">Jason Statham</a></li>
						<li class="artist-item"><a href="#" class="active">Dolph Lundgren</a></li>
						<li class="artist-item"><a href="#">Randy Couture</a></li>
						<li class="artist-item"><a href="#">Mickey Rourke</a></li>
						<li class="artist-item"><a href="#">Charisma Carpenter</a></li>
						<li class="artist-item"><a href="#">Jean-Claude Van Damme</a></li>
						<li class="artist-item"><a href="#">Antonio Banderas</a></li>
						<li class="artist-item"><a href="#">Wesley Snipes</a></li>
						<li class="artist-item"><a href="#">Jet li</a></li>
						<li class="artist-item"><a href="#">Arnold Schwarzenegger</a></li>
						<li class="artist-item"><a href="#">Bruce Willis</a></li>
						<li class="artist-item"><a href="#">Syvester Stallone</a></li>
						<li class="artist-item"><a href="#">Jason Statham</a></li>
						<li class="artist-item"><a href="#">Dolph Lundgren</a></li>
						<li class="artist-item"><a href="#">Randy Couture</a></li>
						<li class="artist-item"><a href="#">Mickey Rourke</a></li>
						<li class="artist-item"><a href="#">Charisma Carpenter</a></li>
						<li class="artist-item"><a href="#">Jean-Claude Van Damme</a></li>
						<li class="artist-item"><a href="#">Antonio Banderas</a></li>
						<li class="artist-item"><a href="#">Wesley Snipes</a></li>
					</ul>
				</form>
			</div><!-- .right-sidebar -->
		</div><!-- .content -->
	</div><!-- .main -->

</div><!-- .wrapper -->

