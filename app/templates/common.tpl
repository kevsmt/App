<div class="app-rounded-content-box" 
	{{if image}} 
		style="background-image:url(${image});
		background-repeat:no-repeat;
		background-position:10px 15px;
		padding-left:70px;"
	{{/if}}>
	{{if title}}<h1>${title}</h1>{{/if}}
	{{if message}}<p>{{html message}}</p>{{/if}}
</div>