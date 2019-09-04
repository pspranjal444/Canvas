import React, {Component} from 'react';



class AnnouncementCard extends Component{
    constructor(props){
        super(props);
    }

    
    
    render(){
        
        return(
            <div className="cardLayoutAnncn" style={{display: 'inline-block', borderLeft: '5px solid #0055A2'}}>
                <h3 style={{textAlign: 'left'}}>{this.props.annName}</h3>
                <p style={{height: 'auto', width: '796px', backgroundColor: '#d8d5d5', textAlign: 'left', borderRadius: '5px', padding: '6px'}}><i>{this.props.annDesc}</i></p>
            </div>
        );
    }
}

export default AnnouncementCard;