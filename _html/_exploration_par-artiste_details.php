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
					Daniel Buren
				</h1>
				<div class="entry-meta clearfix">
					Homme - 61 ans
					<ul class="unstyled">
						<li class="entry-meta-item"><a href="#" target="_blank">Infos galerie</a></li>
						<li class="entry-meta-item"><a href="#" target="_blank">Site internet</a></li>
					</ul>
				</div>
			</section>
			<aside>
				<div class="entry-description">
					<div class="inner">
						<p><strong>En 2013,</strong> cet artiste <br />a exposé dans <strong>13 pays</strong> <br />via <strong>26 expositions</strong>.</p>
					</div><!-- .inner -->
				</div><!-- .entry-description -->
			</aside>
		</div><!-- .entry-content -->
	</div><!-- .entry-header -->

	<div class="row main">

		<div class="col sidebar left-sidebar">
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

			<div class="legend">

					<fieldset>
						<legend>Légende</legend>
						<dl>
							<dt>Type d'exposition</dt>
							<dd class="solo ng-binding"><strong>Solo</strong></dd>
							<dd class="collective ng-binding"><strong>Collective</strong></dd>
							<dt>Organisateur</dt>
						</dl>
						<ul class="unstyled organizer-list">
						<!-- ngRepeat: organizer in organizers --><li ng-repeat="organizer in organizers" class="Non-profit-organization"><strong class="ng-binding">Non-profit organization</strong> <em class="ng-binding">1</em></li><!-- end ngRepeat: organizer in organizers --><li ng-repeat="organizer in organizers" class="Private-Gallery"><strong class="ng-binding">Private Gallery</strong> <em class="ng-binding">14</em></li><!-- end ngRepeat: organizer in organizers --><li ng-repeat="organizer in organizers" class="Public-Institution"><strong class="ng-binding">Public Institution</strong> <em class="ng-binding">22</em></li><!-- end ngRepeat: organizer in organizers -->
						</ul>
					</fieldset>

			</div><!-- .legend -->

		</div><!-- .left-sidebar -->

		<div class="col content">

			<div class="content-block">
				<p>
					<strong>87%</strong>
					d'expositions à l'étranger
				</p>
			</div><!-- .content-block -->
		</div><!-- .content -->

		<div class="col right-sidebar artist-details-sidebar">
			<form action="about:blank">
				<input type="text" value="" class="input-sidebar" placeholder="Rechercher une exposition..." />
				<ul class="unstyled">
					<li class="exposition-item"><a href="#" class="colorA">Materializing "Six Years": Lucy R. Lippard and the Emergence of Conceptual Art</a></li>
					<li class="exposition-item"><a href="#" class="colorB">A WINDOW ON THE WORLD, from Dürer to Mondrian and beyond</a></li>
					<li class="exposition-item"><a href="#" class="colorD">Una finestra sul mondo - Da Dürer a Mondrian e oltre</a></li>
					<li class="exposition-item"><a href="#" class="colorC">Private Kunstsammlungen Münster - Director´s Choice</a></li>
					<li class="exposition-item"><a href="#" class="colorD">Materializing "Six Years": Lucy R. Lippard and the Emergence of Conceptual Art</a></li>
					<li class="exposition-item"><a href="#" class="colorC">A WINDOW ON THE WORLD, from Dürer to Mondrian and beyond</a></li>
					<li class="exposition-item"><a href="#" class="colorD">Una finestra sul mondo - Da Dürer a Mondrian e oltre</a></li>
					<li class="exposition-item"><a href="#" class="colorB">Private Kunstsammlungen Münster - Director´s Choice</a></li>
				</ul>
			</form>

			<div class="news-block">
				<h2>Actualités</h2>
				<ul class="unstyled">
					<li class="news-block-item"><a href="#"><strong>Materializing Six Years: Lucy R. Lippard and the Emergence of Conceptual Art</strong> @New York -  USA / 2 février - 3 mars 2014 </a></li>
					<li class="news-block-item"><a href="#"><strong>Una ﬁnestra sul mondo - Da Dürer a Mondrian e oltre</strong> @New York -  USA / 2 février - 3 mars 2014 </a></li>
				</ul>
			</div><!-- .news-block -->

		</div><!-- .right-sidebar -->

	</div><!-- .row -->

</div><!-- .wrapper -->

