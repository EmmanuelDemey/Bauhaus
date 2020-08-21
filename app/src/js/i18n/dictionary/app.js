import btnD from './generic/btn';
const dictionary = {
	langs: {
		fr: 'Français',
		en: 'English',
	},
	welcome: {
		fr: 'Application de gestion des métadonnées de référence',
		en: 'Metadata management application',
	},
	home: {
		fr: 'Accueil',
		en: 'Home',
	},
	help: {
		fr: 'Aide',
		en: 'Help',
	},
	display: {
		fr: 'Afficher',
		en: 'Display',
	},
	hide: {
		fr: 'Cacher',
		en: 'Hide',
	},
	authorizationTitle: {
		fr: 'Habilitations',
		en: 'Authorizations',
	},
	administrationTitle: {
		fr: 'Administration',
		en: 'Administration',
	},

	noResult: {
		fr: 'Aucun résultat',
		en: 'No results',
	},
	result: {
		fr: 'résultat',
		en: 'result',
	},
	results: {
		fr: 'résultats',
		en: 'results',
	},
	requiredFields: {
		fr: 'Champs requis',
		en: 'Required fields',
	},
	version: {
		fr: 'Version',
		en: 'Version',
	},

	langTitle: {
		fr: 'Langue',
		en: 'Language',
	},
	notFoundTitle: {
		fr: 'Page introuvable',
		en: 'Page not found',
	},
	multiModalNoNewBody: {
		fr: 'Remplissez le champ précédent pour en ajouter un nouveau',
		en: 'Complete the previous field before adding another',
	},
	multiModalRemoveCompleteBody: {
		fr: 'Impossible de supprimer un champ rempli',
		en: 'Impossible to remove a completed field',
	},
	multiModalRemoveLastBody: {
		fr: 'Impossible de supprimer le dernier champ',
		en: 'Impossible to remove the last field',
	},

	errorBody: {
		fr: 'Veuillez contacter :DR59-SINL-Equipe-maintenance-RMeS',
		en: 'Please contact :DR59-SINL-Equipe-maintenance-RMeS',
	},
	exportTitle: {
		fr: 'Export',
		en: 'Export',
	},
	idTitle: {
		fr: 'Identifiant',
		en: 'Identifier',
	},
	labelTitle: {
		fr: 'Libellé',
		en: 'Label',
	},
	search: {
		fr: 'Recherchez...',
		en: 'Search...',
	},
	searchLabelPlaceholder: {
		fr: 'Libellé...',
		en: 'Label...',
	},
	searchLabelHomePlaceholder: {
		fr: 'Libellé (ou libellé alternatif)...',
		en: 'Label (or alternative label)...',
	},

	altLabelTitle: {
		fr: 'Libellé alternatif',
		en: 'Alternative label',
	},
	altLabel: {
		fr: 'Nom court',
		en: 'Short name',
	},
	searchAltLabelPlaceholder: {
		fr: 'Libellé alternatif...',
		en: 'Alternative label...',
	},
	descriptionTitle: {
		fr: 'Description',
		en: 'Description',
	},
	searchDefinitionPlaceholder: {
		fr: 'Rechercher dans la définition...',
		en: 'Search in the definition ...',
	},
	validationStatusPlaceholder: {
		fr: 'Sélectionnez le statut de publication...',
		en: 'Select publishing status...',
	},
	creatorTitle: {
		fr: 'Propriétaire',
		en: 'Owner',
	},
	contributorTitle: {
		fr: 'Gestionnaire',
		en: 'Contributor',
	},

	stampsPlaceholder: {
		fr: 'Sélectionnez un timbre...',
		en: 'Select stamp...',
	},
	disseminationStatusTitle: {
		fr: 'Statut de diffusion',
		en: 'Dissemination status',
	},
	disseminationStatusPlaceholder: {
		fr: 'Sélectionnez un statut de diffusion...',
		en: 'Select dissemination status...',
	},
	additionalMaterialTitle: {
		fr: 'Document lié',
		en: 'Additional material',
	},
	creationsTitle: {
		fr: 'créations',
		en: 'creations',
	},
	modificationsTitle: {
		fr: 'modifications',
		en: 'modifications',
	},
	createdDateTitle: {
		fr: 'Date de création',
		en: 'Creation date',
	},
	modifiedDateTitle: {
		fr: 'Date de modification',
		en: 'Modification date',
	},
	validDateTitle: {
		fr: 'Date de fin de validité',
		en: 'Expiration date',
	},
	issuedDateTitle: {
		fr: "Date légale d'entrée en vigueur",
		en: 'Legal start date',
	},
	lastRefreshedOnDateTitle: {
		fr: 'Date de dernière mise à jour',
		en: 'Last update',
	},
	rightsTitle: {
		fr: "Droit d'auteur",
		en: 'Copyright',
	},
	legalMaterialTitle: {
		fr: 'Textes légaux',
		en: 'Legal material',
	},
	homepageTitle: {
		fr: 'Url de diffusion de la nomenclature',
		en: 'Classification diffusion Url',
	},
	duplicatedId: {
		fr: "L'identifiant choisi existe déjà",
		en: 'This identifier already exists',
	},
	duplicatedLabel: {
		fr: 'Le libellé choisi existe déjà',
		en: 'This label already exists',
	},
	globalInformationsTitle: {
		fr: 'Informations générales',
		en: 'General information',
	},
	notesTitle: {
		fr: 'Notes',
		en: 'Notes',
	},
	linksTitle: {
		fr: 'Liens',
		en: 'Links',
	},
	...btnD,
	// Links
	narrowerTitle: {
		fr: 'Parent',
		en: 'Parent',
	},
	broaderTitle: {
		fr: 'Enfant',
		en: 'Child',
	},
	referencesTitle: {
		fr: 'Référence',
		en: 'References',
	},
	replacesTitle: {
		fr: 'Remplace',
		en: 'Replaces',
	},
	relatedTitle: {
		fr: 'Lié',
		en: 'Related',
	},
	// Mail
	mailTitle: {
		fr: 'Message',
		en: 'Mail',
	},
	mailRecipientTitle: {
		fr: 'Destinataire',
		en: 'Recipient',
	},
	mailSenderTitle: {
		fr: 'Emetteur',
		en: 'Sender',
	},
	mailObjectTitle: {
		fr: 'Objet',
		en: 'Object',
	},
	invalidMailAdress: {
		fr: 'Saisir une adresse mail valide pour le destinataire',
		en: 'Insert a valid e-mail address for the recipient',
	},
	emptyMailObject: {
		fr: "L'objet du message est vide",
		en: 'The mail subject is empty',
	},
	emptyMailBody: {
		fr: 'Le corps du message est vide',
		en: 'The mail body is empty',
	},
	// Export
	exportModalTitle: {
		fr: "Veuillez sélectionner le type d'export",
		en: 'Please select export type',
	},
	exportModalBody: {
		fr: `<p>Les PDF ne sont pas modifiables.</p>
			<p>Les ODT sont modifiables sous LibreOffice.</p>`,
		en: `<p>PDF files can not be modified.</p>
			<p>ODT files can be modified with LibreOffice.</p>`,
	},
	// Calendar
	calendarDays: {
		fr: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
		en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	},
	calendarMonths: {
		fr: [
			'Janvier',
			'Février',
			'Mars',
			'Avril',
			'Mai',
			'Juin',
			'Juillet',
			'Août',
			'Septembre',
			'Octobre',
			'Novembre',
			'Décembre',
		],
		en: [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		],
	},
	// Pagination
	paginationFirst: {
		fr: 'Début',
		en: 'First',
	},
	paginationLast: {
		fr: 'Fin',
		en: 'Last',
	},
	// Auth
	passwordTitle: {
		fr: 'Mot de passe',
		en: 'Password',
	},
	pickedUserProfil: {
		fr: 'Choisir un profil utilisateur',
		en: 'Pick a user profil',
	},
	pickedRolePlaceholder: {
		fr: 'Sélectionner un rôle...',
		en: 'Select a role...',
	},

	loadableLoading: {
		fr: 'Chargement en cours...',
		en: 'Loading in progress...',
	},

	authorizationManagementTitle: {
		fr: 'Habilitations',
		en: 'Authorization',
	},

	pickedUserAddTitle: {
		fr: 'Agents à ajouter',
		en: 'User to add',
	},
	modalRemoveRoleTitle: {
		fr: 'Confirmation',
		en: 'Confirm',
	},
	modalRemoveRoleBody: {
		fr: (role, user) => `Voulez-vous supprimer le rôle ' ${role} ' à ${user} ?`,
		en: (role, user) => `Do you want to remove ' ${role} ' role from ${user} ?`,
	},
	dashboardTitle: {
		fr: 'Tableau de bord',
		en: 'Dashboard',
	},
	dashboardSummaryTitle: {
		fr: 'Récapitulatif',
		en: 'Summary',
	},
	dashboardCreationListTitle: {
		fr: 'Liste des créations',
		en: 'Creation list',
	},
	dashboardModificationListTitle: {
		fr: 'Liste des modifications',
		en: 'Modification list',
	},
	totalTitle: {
		fr: 'Total',
		en: 'Total',
	},
	DSPublicGeneriqueTitle: {
		fr: 'Public générique',
		en: 'Public generic',
	},
	DSPublicSpecifiqueTitle: {
		fr: 'Public spécifique',
		en: 'Public specific',
	},
	DSPrivateTitle: {
		fr: 'Privé',
		en: 'Private',
	},
};

export default dictionary;
