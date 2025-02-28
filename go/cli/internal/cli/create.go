package cli

import (
	"encoding/json"
	"os"

	"github.com/abiosoft/ishell/v2"
	autogen_client "github.com/kagent-dev/kagent/go/autogen/client"
	"github.com/kagent-dev/kagent/go/cli/internal/config"
)

func CreateCmd(c *ishell.Context) {
	if len(c.Args) < 2 {
		c.Println("Usage: create [resource_type] [file]")
		return
	}

	c.Println(c.Args)

	resourceType := c.Args[0]
	fileName := c.Args[1]

	f, err := os.ReadFile(fileName)
	if err != nil {
		c.Printf("Error opening file %s: %v\n", fileName, err)
		return
	}

	cfg, err := config.Get()
	if err != nil {
		c.Printf("Failed to get config: %v\n", err)
		return
	}

	client := autogen_client.New(cfg.APIURL, cfg.WSURL)

	switch resourceType {
	case "team":
		var team autogen_client.Team
		if err := json.Unmarshal(f, &team); err != nil {
			c.Printf("Error unmarshalling team: %v\n", err)
			return
		}
		if err := client.CreateTeam(&team); err != nil {
			c.Printf("Error creating team: %v\n", err)
			return
		}
	default:
		c.Println("Invalid resource type. Valid resource types are: team")
	}
}
