document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
	// getting values from form
	var issueDesc = document.getElementById('issueDescInput').value;
	var issueSeverity = document.getElementById('issueSeverityInput').value;
	var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
	var issueId = chance.guid();
	var issueStatus = 'Open';

	// adding values to an object
	var issue = {
		id: issueId,
		description: issueDesc,
		severity: issueSeverity,
		assignedTo: issueAssignedTo,
		status: issueStatus
	};

	//setting the object to local storage
	if (localStorage.getItem('issues') == null) {
		var issues = [];
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues));
	} else {
		var issues = JSON.parse(localStorage.getItem('issues'));
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues));
	}

	// resetting form
	document.getElementById('issueInputForm').reset();

	//calling fetchIssues to re-render list
	fetchIssues();

	e.preventDefault();
}

const fetchIssues = () => {
	//getting object from local storage
	var issues = JSON.parse(localStorage.getItem('issues'));
	var issueList = document.getElementById('issueList');

	issueList.innerHTML = '';
	//if (!issues) return;

	// for each issue rendering html
	for (var i = 0; i < issues.length; i++) {
		var id = issues[i].id;
		var description = issues[i].description;
		var severity = issues[i].severity;
		var assignedTo = issues[i].assignedTo;
		var status = issues[i].status;

		issueList.innerHTML +=
			'<div class="jumbotron">' +
			'<h6>Issue ID: ' +
			id +
			'</h6>' +
			'<p><span class="badge badge-primary">' +
			status +
			'</span></p>' +
			'<h3>' +
			description +
			'</h3>' +
			'<p><span class="material-icons">trending_up</span>' +
			severity +
			'</p>' +
			'<p><span class="material-icons">account_circle</span>' +
			assignedTo +
			'</p>' +
			'<a href="#" onclick="setStatusClosed(\'' +
			id +
			'\')" class="btn btn-warning">Close</a> ' +
			'<a href="#" onclick="setOnhold(\'' +
			id +
			'\')" class="btn btn-primary">On Hold</a>' +
			'<a href="#" onclick="deleteIssue(\'' +
			id +
			'\')" class="btn btn-danger">Delete</a>' +
			'</div>';
	}
};
