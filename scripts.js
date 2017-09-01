/*
██   ██ ███████  █████  ██████  ███████ ██████
██   ██ ██      ██   ██ ██   ██ ██      ██   ██
███████ █████   ███████ ██   ██ █████   ██████
██   ██ ██      ██   ██ ██   ██ ██      ██   ██
██   ██ ███████ ██   ██ ██████  ███████ ██   ██
*/

const Header = () => {
	// title header for page

    return (
        <div className="header">
            <a href="https://www.freecodecamp.com">
                <img className="FCCLogo" src="https://www.freecodecamp.com/design-style-guide/img/freeCodeCamp.svg" alt="FreeCodeCamp"/>
            </a>
        </div>
    );
}

/*
████████  █████  ██████  ██      ███████
   ██    ██   ██ ██   ██ ██      ██
   ██    ███████ ██████  ██      █████
   ██    ██   ██ ██   ██ ██      ██
   ██    ██   ██ ██████  ███████ ███████
*/

const LeaderTable = (props) => {
	// leader table displaying campers ranked by points

	// for each camper, display row of camper statistics
    const leaderTable = props.leaders.map((leader, index) => {
        return (
            <tr key={leader.username}>
                <td>{index + 1}</td>
                <td>
                    <a href={"https://www.freecodecamp.com/" + leader.username}><img src={leader.img}/>{leader.username}</a>
                </td>
                <td>{leader.recent}</td>
                <td>{leader.alltime}</td>
            </tr>
        );
    });

    return (
        <div>
            <table className="table table-striped table-bordered">
                <caption>
                    <h1>Camper LeaderBoard</h1>
                    <div>
                        <h4>Sort By Top Campers:</h4>
                        <button
							onClick={() => props.onButtonClick("https://fcctop100.herokuapp.com/api/fccusers/top/recent")}
						>
							In Last 30 Days
						</button>
                        <button
							onClick={() => props.onButtonClick("https://fcctop100.herokuapp.com/api/fccusers/top/alltime")}
						>
							Of All Time
						</button>
                    </div>
                </caption>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Camper name</th>
                        <th>Points in Last 30 Days</th>
                        <th>Total Points</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderTable}
                </tbody>
            </table>
        </div>
    );
}

/*
 █████  ██████  ██████
██   ██ ██   ██ ██   ██
███████ ██████  ██████
██   ██ ██      ██
██   ██ ██      ██
*/

class App extends React.Component {
	// main application

    constructor(props) {
        super(props);
        this.state = {
            leaders: [],
            url: "https://fcctop100.herokuapp.com/api/fccusers/top/recent"
        };
		this.getLeaders = this.getLeaders.bind(this);
    }

    componentDidMount() {
		// when component mounts get top 100 campers

        this.getLeaders(this.state.url);
    }

    getLeaders(url) {
		// function for getting top 100 campers by most recent or all time

        $.getJSON(url, (leaders) => {
            this.setState({leaders});
        });
    }

    render() {
        return (
            <div>
                <Header/>
                <LeaderTable
					leaders={this.state.leaders}
					onButtonClick={this.getLeaders}/>
            </div>
        );
    }
}

ReactDOM.render( <App/>, document.querySelector("#App"));
