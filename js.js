$(function () {
    $(document).scroll(function () {
      var $nav = $(".navbar");
      $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
  });

  const data = fetch('portfolio.json')
    .then( d => d.json())
    .then (d => printAllProjects(d.projects)) 
    .catch((error) => {
        console.log(error)
      });


function printAllProjects(data){
    const portfolio = document.querySelector('#portfolio');
    
    data.forEach(element => {
        const div = document.createElement('div');
        let span = '';
        element.skillset.forEach(element => {
            span += `<span class="text-muted border border-secondary p-1 mr-2 rounded shadow-sm">${element}</span>`;
        });
        div.className = 'card col-lg-10 mx-lg-auto mb-3 p-0';
        div.setAttribute('data-toggle', 'modal');
        div.setAttribute('data-target', `#${element.id}`);
        div.innerHTML = '';
        div.innerHTML += `<div class="row no-gutters">
                            <div class="col-lg-4 d-flex align-items-center" style="background-color: rgb(211, 210, 210)">
                                <img src="${element.img}" class="card-img" alt="${element.name}">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${element.name}</h5>
                                    <p class="card-text">${element.description}</p>
                                    <p class="card-text"><strong class="text-muted">Used Stack:</strong> 
                                    <p class="d-flex flex-wrap">
                                        ${span}
                                    </p>
                                </p>
                                </div>
                            </div>
                        </div>`;
        portfolio.appendChild(div);

        const modal = document.createElement('div');
        modal.className = 'modal fade'; modal.id=`${element.id}`; modal.tabIndex = '-1'; modal.role = 'dialog'; 
        modal.setAttribute('aria-labelledby', 'exampleModalLabel'); 
        modal.setAttribute('aria-hidden', 'true');
        modal.innerHTML = `
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header bg-primary text-white">
                                        <h5 class="modal-title" id="exampleModalLabel">${element.name}</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body d-flex flex-column align-items-center">
                                        <div class="rounded mb-1"><img src="${element.img}" alt="${element.name}" class="img-fluid"> <hr></div>
                                        <div class="mb-1">${element.description}<hr></div>
                                        <p class="d-flex flex-wrap m-0">
                                            ${span}
                                            <hr>
                                        </p>
                                        <div class="text-white">
                                            <a href="${element.linkToSite}" target="_blank" class="btn btn-primary btn-lg btn-block"><i class="fas fa-eye"></i> Live Version</a>
                                            <a href="${element.linkToGit}" target="_blank" class="btn btn-secondary btn-lg btn-block"><i class="fab fa-github"></i> View Code</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `;
        document.body.appendChild(modal);
    });

    
}