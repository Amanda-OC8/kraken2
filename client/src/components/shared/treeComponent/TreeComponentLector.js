import React, { Component } from 'react'

import commonService from '../../../service/common.service'
import characterService from '../../../service/character.service'
import folderService from '../../../service/folder.service'
import archiveService from '../../../service/archive.service'

import Collapse from 'react-bootstrap/Collapse'
import NavLink from 'react-bootstrap/NavLink'



import { Link } from 'react-router-dom/cjs/react-router-dom.min'

import './TreeComponent.css'



class TreeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            treeComponent: [],
            components: [],
            showMoreCharac: false,
            showMoreFolders: false,
            showMoreArchives: false,
            
            selectFolder: "",
            deleteType: "",
            firstDeleteId: "",
            secondDeleteId: ""

        }
        this.commonService = new commonService()
        this.characterService = new characterService()
        this.folderService = new folderService()
        this.archiveService = new archiveService()


    }

    componentDidMount = () => this.loadCommon()

    loadCommon = () => {

        this.commonService
            .getTree(this.props.match.params.project_id)
            .then(response => this.setState({ components: response.data }))
            .catch(err => console.log('Error:', err))

    }



    showMoreTextCharac = () => this.setState({ showMoreCharac: !this.state.showMoreCharac })
    showMoreTextFolders = () => this.setState({ showMoreFolders: !this.state.showMoreFolders })
    showMoreTextArchives = () => this.setState({ showMoreArchives: !this.state.showMoreArchives })


    createNode = () => {
        let tree = { characters: [], folders: [], nested: [], archives: [] }

        this.state.components.map(elm => elm.map(subelm => {

            if (subelm.model === "Character") {

                tree.characters.push({ name: `${subelm.name} ${subelm.surname}`, id: subelm._id })

            } else if (subelm.model === "Folder") {

                if (subelm.archives.length) {

                    subelm.archives.map(arElm => arElm.parentFolder === subelm._id ? tree.archives.push({ name: arElm.name, id: arElm._id }) : null)
                }

                if (tree.archives.length) {
                    tree.nested.push({ parent: { name: subelm.name, id: subelm._id }, nested: tree.archives })
                } else {
                    tree.folders.push({ name: subelm.name, id: subelm._id })
                }
                tree.archives = []
            }

        }))

        return tree


    }


    render() {
        let treeC = {}
        let existTree = false
        if (this.state.components.length !== 0) {
            treeC = this.createNode()
            existTree = true


        }
        console.log(this.props)


        return (
            <>

                <ul>
                    <h4><Link className="tree-link" to={`/projects/${this.props.match.params.project_id}/all-characters`}>Personajes</Link></h4>
                    {!this.state.showMoreCharac && <NavLink onClick={this.showMoreTextCharac} className="show-more">Mostrar todos</NavLink>}
                    {this.state.showMoreCharac && <NavLink onClick={this.showMoreTextCharac} className="show-more">Ocultar todos</NavLink>}
                    <Collapse in={this.state.showMoreCharac}>
                        <span>
                            {existTree && treeC.characters.map((elm, index) => <li key={index}><Link className="tree-link" to={`/projects/${this.props.match.params.project_id}/character/${elm.id}/details`}>{elm.name}</Link> </li>)}

                        </span>
                    </Collapse>


                    <br />
                    <h4>Carpetas</h4>
                    {!this.state.showMoreFolders && <NavLink onClick={this.showMoreTextFolders} className="show-more">Mostrar todas</NavLink>}
                    {this.state.showMoreFolders && <NavLink onClick={this.showMoreTextFolders} className="show-more">Ocultar todas</NavLink>}

                    <Collapse in={this.state.showMoreFolders}>
                        <span>
                            {existTree && treeC.folders.map((elm, index) => <li key={index}><Link className="tree-link" to={`/projects/${this.props.match.params.project_id}/${elm.id}/details`}>{elm.name}</Link></li>)}

                            {existTree && treeC.nested.map((elm, index) => <li key={index}><Link className="tree-link" to={`/projects/${this.props.match.params.project_id}/${elm.parent.id}/details`}>{elm.parent.name}</Link> </li>)}

                        </span>
                    </Collapse>
                    <br />
                    <h4>Archivos</h4>
                    {!this.state.showMoreArchives && <NavLink onClick={this.showMoreTextArchives} className="show-more">Mostrar todos</NavLink>}
                    {this.state.showMoreArchives && <NavLink onClick={this.showMoreTextArchives} className="show-more">Ocultar todos</NavLink>}
                    <Collapse in={this.state.showMoreArchives}>
                        <span>
                            {existTree &&
                                <ul>
                                    {treeC.nested.map(elm => elm.nested ? elm.nested.map((subelm, index) => <li key={index}>{elm.parent.name}: <Link className="tree-link" to={`/projects/${this.props.match.params.project_id}/folder/${elm.parent.id}/archive/${subelm.id}/details`}>{subelm.name}</Link> </li> ): null)}
                                </ul>}
                        </span>
                    </Collapse>
                </ul>

                


            </>
        )
    }
}

export default TreeComponent