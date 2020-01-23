import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const StyledMenu = withStyles({
	paper: {
		border: '1px solid #d3d4d5'
	}
})((props) => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center'
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center'
		}}
		{...props}
	/>
));

const StyledMenuItem = withStyles((theme) => ({
	root: {
		'&:focus': {
			backgroundColor: theme.palette.primary.main,
			'& .MuiListItemIcon-root, & .MuiListItemText-primary': {
				color: theme.palette.common.white
			}
		}
	}
}))(MenuItem);

function closeSession() {
	localStorage.removeItem('userToken');
	window.location.href = '/';
}

export default function ProfileOptions(props) {
	const [ anchorEl, setAnchorEl ] = React.useState(null);

	function goToProfile() {
		const $id = localStorage.getItem('userId');
		window.location.href = '/profile/' + $id;
	}

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Button
				aria-controls="customized-menu"
				aria-haspopup="true"
				variant="contained"
				color="primary"
				onClick={handleClick}
			>
				Perfil
				<ArrowDropDownIcon />
			</Button>
			<StyledMenu
				id="customized-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<StyledMenuItem onClick={goToProfile}>
					<ListItemIcon>
						<PersonIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="My Profile" />
				</StyledMenuItem>
				<StyledMenuItem onClick={closeSession}>
					<ListItemIcon>
						<ExitToAppIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="Log out" />
				</StyledMenuItem>
			</StyledMenu>
		</div>
	);
}
